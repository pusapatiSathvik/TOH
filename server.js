// server.js
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");
const { GridFSBucket, ObjectId } = require("mongodb");

const MONGO_URI = process.env.MONGODB_URI
const FLASK_PREDICT_URL = process.env.FLASK_PREDICT_URL || "http://127.0.0.1:5000/predict";
const PORT = process.env.PORT || 8000;

// Multer config
const upload = multer({ storage: multer.memoryStorage() });

/* Mongoose schema */
const reportsSchema = new mongoose.Schema({
  registration_number: String,
  Phone_number: String,
  predictions: [
    {
      date: { type: Date, default: Date.now },
      originalFileId: mongoose.Schema.Types.ObjectId,
      overlayFileId: mongoose.Schema.Types.ObjectId,
      imageName: String,
      label: String,
      prediction: Number,
      feedback: String,
      predictionQuality: String,
    },
  ],
});
const Reports = mongoose.model("reports", reportsSchema);

let gfsBucket;

/* Connect DB */
async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("[Node] Connected to MongoDB");
  const db = mongoose.connection.db;
  gfsBucket = new GridFSBucket(db, { bucketName: "images" });
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Node server: ready"));

/* ========== Upload ========= */
app.post("/uploads", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    if (!gfsBucket) return res.status(500).json({ error: "GridFS not ready" });

    const { originalname, buffer, mimetype } = req.file;
    const { Pn, Rn } = req.body;
    if (!Rn) return res.status(400).json({ error: "Registration number required" });

    // 1) send to Flask
    const form = new FormData();
    form.append("image", buffer, { filename: originalname, contentType: mimetype });
    form.append("Rn", Rn);

    const flaskResp = await axios.post(FLASK_PREDICT_URL, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 60_000,
    });
    const { predicted_class, prediction, overlay_image } = flaskResp.data;

    // 2) Save original in GridFS
    const originalUploadStream = gfsBucket.openUploadStream(originalname, {
      contentType: mimetype,
      metadata: { registration_number: Rn, uploadedAt: new Date() },
    });
    originalUploadStream.end(buffer);
    const originalFileId = await new Promise((resolve, reject) => {
      originalUploadStream.on("finish", () => resolve(originalUploadStream.id));
      originalUploadStream.on("error", reject);
    });

    // 3) Save overlay if present
    let overlayFileId = null;
    if (overlay_image) {
      const overlayBuffer = Buffer.from(overlay_image, "base64");
      const overlayStream = gfsBucket.openUploadStream(`${Rn}_overlay_${Date.now()}.png`, {
        contentType: "image/png",
        metadata: { registration_number: Rn, derivedFrom: originalFileId, uploadedAt: new Date() },
      });
      overlayStream.end(overlayBuffer);
      overlayFileId = await new Promise((resolve, reject) => {
        overlayStream.on("finish", () => resolve(overlayStream.id));
        overlayStream.on("error", reject);
      });
    }

    // 4) Save in MongoDB
    const predictionData = {
      date: new Date(),
      originalFileId,
      overlayFileId,
      imageName: originalname,
      label: predicted_class,
      prediction: typeof prediction === "number" ? prediction : parseFloat(prediction),
      feedback: "",
      predictionQuality: "",
    };
    const existing = await Reports.findOne({ registration_number: Rn });
    if (existing) {
      existing.predictions.push(predictionData);
      await existing.save();
    } else {
      await Reports.create({
        registration_number: Rn,
        Phone_number: Pn || "",
        predictions: [predictionData],
      });
    }

    res.json({
      success: true,
      label: predicted_class,
      prediction,
      originalFileId: originalFileId.toString(),
      overlayFileId: overlayFileId ? overlayFileId.toString() : null,
    });
  } catch (err) {
    console.error("[Node] /uploads error:", err.message);
    res.status(500).json({ error: "An internal server error occurred during upload." });
  }
});

/* ========== Search ========= */
app.get("/search", async (req, res) => {
  try {
    const { registrationNumber } = req.query;
    if (!registrationNumber) return res.status(400).json({ error: "registrationNumber required" });

    const reports = await Reports.find({ registration_number: registrationNumber });
    res.json(reports);
  } catch (err) {
    console.error("[Node] /search error:", err.message);
    res.status(500).json({ error: "An internal server error occurred during search." });
  }
});

/* ========== NEW: Get All Data (for Table.jsx) ========= */
app.get("/getdata", async (req, res) => {
  try {
    const allReports = await Reports.find({}).sort({ "predictions.date": -1 });
    res.json(allReports);
  } catch (err) {
    console.error("[Node] /getdata error:", err.message);
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

/* ========== NEW: Get Single User Data (for DetailView.jsx) ========= */
app.get("/getdata/:registrationNumber", async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    if (!registrationNumber) {
      return res.status(400).json({ error: "Registration number parameter is required." });
    }
    const report = await Reports.findOne({ registration_number: registrationNumber });
    if (!report) {
      return res.status(404).json({ error: "No report found for this registration number." });
    }
    // The findOne result is an object, but DetailView expects an array, so wrap it
    res.json([report]);
  } catch (err) {
    console.error(`[Node] /getdata/${req.params.registrationNumber} error:`, err.message);
    res.status(500).json({ error: "Failed to fetch user details." });
  }
});

/* ========== Submit Feedback ========= */
app.post("/submitFeedback", async (req, res) => {
  try {
    const { registrationNumber, feedback, predictionQuality } = req.body;
    if (!registrationNumber) return res.status(400).json({ error: "registrationNumber required" });

    const report = await Reports.findOne({ registration_number: registrationNumber });
    if (!report) return res.status(404).json({ error: "Report not found" });

    if (report.predictions.length === 0) return res.status(400).json({ error: "No predictions for this registration" });

    // update latest prediction
    const latestPrediction = report.predictions[report.predictions.length - 1];
    latestPrediction.feedback = feedback || "";
    latestPrediction.predictionQuality = predictionQuality || "";

    await report.save();
    res.json({ success: true, message: "Feedback saved" });
  } catch (err) {
    console.error("[Node] /submitFeedback error:", err.message);
    res.status(500).json({ error: "An internal server error occurred while submitting feedback." });
  }
});

app.get("/stats", async (req, res) => {
  try {
    const stats = await Reports.aggregate([
      // Stage 1: Deconstruct the predictions array into separate documents
      { $unwind: "$predictions" },
      
      // Stage 2: Group all documents to calculate the totals
      {
        $group: {
          _id: null, // Group all documents into a single result
          totalScanned: { $sum: 1 },
          defectsFound: {
            $sum: {
              $cond: [{ $eq: ["$predictions.label", "Cracked"] }, 1, 0]
            }
          },
          totalFeedback: {
            $sum: {
              $cond: [{ $in: ["$predictions.predictionQuality", ["Accurate", "Not Accurate"]] }, 1, 0]
            }
          },
          accurateFeedback: {
            $sum: {
              $cond: [{ $eq: ["$predictions.predictionQuality", "Accurate"] }, 1, 0]
            }
          }
        }
      }
    ]);

    if (stats.length > 0) {
      const result = stats[0];
      const accuracy = result.totalFeedback > 0 ? (result.accurateFeedback / result.totalFeedback) * 100 : 100; // Default to 100 if no feedback yet
      
      res.json({
        tyresScanned: result.totalScanned,
        detectionAccuracy: accuracy,
        defectsFound: result.defectsFound,
      });
    } else {
      // If there are no predictions in the database at all
      res.json({
        tyresScanned: 0,
        detectionAccuracy: 100,
        defectsFound: 0,
      });
    }
  } catch (err) {
    console.error("[Node] /stats error:", err.message);
    res.status(500).json({ error: "Failed to fetch statistics." });
  }
});

app.get("/check-registration/:registrationNumber", async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    if (!registrationNumber) {
      return res.status(400).json({ error: "Registration number parameter is required." });
    }

    const exists = await Reports.exists({ registration_number: registrationNumber });
    res.json({ exists: !!exists }); // Convert null/object to boolean
  } catch (err) {
    console.error("[Node] /check-registration error:", err.message);
    res.status(500).json({ error: "An internal server error occurred while checking registration." });
  }
});



/* ========== File fetch ========= */
app.get("/file/:id", async (req, res) => {
  try {
    if (!gfsBucket) return res.status(500).send("GridFS not ready");
    const id = new ObjectId(req.params.id);

    const fileDoc = await mongoose.connection.db.collection("images.files").findOne({ _id: id });
    if (!fileDoc) return res.status(404).send("File not found");

    res.set("Content-Type", fileDoc.contentType || "application/octet-stream");
    gfsBucket.openDownloadStream(id).pipe(res);
  } catch (err) {
    console.error("[Node] /file/:id error:", err);
    res.status(500).send("Error fetching file");
  }
});

/* ========== Start ========= */
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Node] Server running on port ${PORT}`);
    console.log(`[Node] Flask URL: ${FLASK_PREDICT_URL}`);
  });
}
start().catch(err => {
  console.error("Failed to start server", err);
  process.exit(1);
});