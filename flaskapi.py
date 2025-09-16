

# flaskapi.py
import os
import io
import base64
import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import cv2

# Keras import
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

# Configuration via environment variables
MODEL_PATH = os.getenv("MODEL_PATH", "improved_cnn_model.h5")
TARGET_SIZE = tuple(map(int, os.getenv("TARGET_SIZE", "128,128").split(",")))
TARGET_LAYER_INDEX = int(os.getenv("TARGET_LAYER_INDEX", "2"))
HEATMAP_THRESHOLD = float(os.getenv("HEATMAP_THRESHOLD", "0.6"))
HOST = os.getenv("FLASK_HOST", "0.0.0.0")
PORT = int(os.getenv("FLASK_PORT", "5000"))

app = Flask(__name__)
CORS(app)

# Load model at startup (fail early if model missing)
model = None
try:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"MODEL_PATH not found: {MODEL_PATH}")
    model = load_model(MODEL_PATH)
    print(f"[Flask] Loaded model from {MODEL_PATH}")
except Exception as e:
    print("[Flask] Error loading model:", e)
    traceback.print_exc()
    model = None


def load_image_bytes(image_bytes, target_size=TARGET_SIZE):
    """
    Loads image from bytes, resizes, and prepares it for the model.
    This mimics the logic from your main prediction script.
    """
    # Use PIL to open the image from bytes and resize it
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize(target_size)
    
    # Convert the PIL image to a NumPy array (values 0-255)
    img_array = img_to_array(img)
    
    # Add a batch dimension (e.g., from (128, 128, 3) to (1, 128, 128, 3))
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


def create_overlay(img_array, target_layer=TARGET_LAYER_INDEX, threshold=HEATMAP_THRESHOLD):
    """
    Create heatmap overlay from model's intermediate layer.
    Returns overlay_image (uint8 RGB numpy array) and heatmap (float 0..1)
    """
    if model is None:
        raise RuntimeError("Model not loaded")

    # This import is needed for creating the visualization model
    from tensorflow.keras.models import Model

    # Create model to output feature maps from the target layer
    try:
        vis_model = Model(inputs=model.input, outputs=model.layers[target_layer].output)
    except (IndexError, AttributeError) as e:
        raise RuntimeError(f"Could not create visualization model for layer {target_layer}: {e}")

    feature_maps = vis_model.predict(img_array)

    # Convert feature maps to a 2D heatmap
    if feature_maps.ndim == 4 and feature_maps.shape[0] == 1:
        fmap = feature_maps[0]
        heatmap = np.mean(fmap, axis=-1)
    else:
        raise ValueError(f"Unexpected feature_maps shape: {feature_maps.shape}")

    # Normalize heatmap to the range 0-1
    heatmap = (heatmap - np.min(heatmap)) / (np.max(heatmap) - np.min(heatmap) + 1e-8)

    # Resize heatmap to match the original image dimensions
    h, w = img_array.shape[1], img_array.shape[2]
    heatmap_resized = cv2.resize(heatmap, (w, h))

    # Create the overlay
    # Input img_array is already in 0-255 range and float32, so just convert to uint8
    overlay_img = img_array[0].copy().astype(np.uint8)
    
    # Apply red mask where heatmap activation is high
    mask = heatmap_resized >= threshold
    overlay_img[mask, :] = [255, 0, 0]  # Apply red overlay
    return overlay_img, heatmap_resized


@app.route("/predict", methods=["POST"])
def predict():
    """
    Receives an image file and returns a prediction with an overlay.
    """
    if "image" not in request.files:
        return jsonify({"error": "No image provided (form field 'image' missing)"}), 400

    if model is None:
        return jsonify({"error": "Model not loaded on the server"}), 503

    try:
        image_bytes = request.files["image"].read()
        # Preprocess the image exactly as in the main prediction script
        img_array = load_image_bytes(image_bytes)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Failed to read or process image", "details": str(e)}), 400

    try:
        # ### START: Main Prediction Logic ###
        # Make prediction and extract the scalar value
        prediction = model.predict(img_array)[0, 0]

        # Determine the predicted class based on the 0.5 threshold
        predicted_class = "Cracked" if prediction > 0.5 else "Normal"
        # ### END: Main Prediction Logic ###

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

    # Generate overlay (best-effort, don't fail the request if this part fails)
    overlay_b64 = None
    try:
        overlay_img, _ = create_overlay(img_array)
        # Encode overlay image to a base64 string
        is_success, buffer = cv2.imencode(".png", cv2.cvtColor(overlay_img, cv2.COLOR_RGB2BGR))
        if not is_success:
            raise RuntimeError("cv2.imencode failed")
        overlay_b64 = base64.b64encode(buffer.tobytes()).decode("utf-8")
    except Exception as e:
        print("[Flask] Overlay generation failed:", e)
        traceback.print_exc()
        # The response will proceed without the overlay

    # Prepare and send the final JSON response
    response_data = {
        "predicted_class": predicted_class,
        "prediction": float(prediction), # Ensure prediction is JSON serializable
        "overlay_image": overlay_b64,
    }
    return jsonify(response_data), 200


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint to verify the service is running."""
    return jsonify({
        "status": "ok",
        "model_loaded": model is not None,
        "target_image_size": TARGET_SIZE,
    }), 200


if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=False)
