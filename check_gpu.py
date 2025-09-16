import tensorflow as tf

# Check TensorFlow version
print("TensorFlow version:", tf.__version__)

# List available physical devices
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    print("GPU is available ✅")
    for i, gpu in enumerate(gpus):
        print(f"  GPU {i}: {gpu}")
else:
    print("No GPU found ❌")
