const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const { getATSAnalysis } = require("../services/aiService");
const { getATSAnalysisGemini } = require("../services/geminiService");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { analyseResume } = require("../controllers/analyseResume")




router.post("/analyze", upload.single("resume"), analyseResume);

// router.post("/save", async (req, res) => {
//   try {
//     const data = req.body;

//     const newResume = new Resume(data);
//     await newResume.save();

//     res.json({
//       message: "Resume saved successfully",
//       data: newResume
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
