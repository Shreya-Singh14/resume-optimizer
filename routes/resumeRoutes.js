const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const { getATSAnalysis } = require("../services/aiService");
const { getATSAnalysisGemini } = require("../services/geminiService");

const { analyseResume } = require("../controllers/analyseResume")

// router.post("/analyze", async (req, res) => {
//   try {
//     const { resumeText, jobDescription } = req.body;

//     const aiResult = await getATSAnalysisGemini(
//       resumeText,
//       jobDescription
//     );

//     res.json({
//       message: "Gemini ATS Analysis",
//       result: aiResult
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


router.post("/analyze", analyseResume);



// router.post("/analyze", async (req, res) => {
//   try {
//     const { resumeText, jobDescription } = req.body;

//     const aiResult = await getATSAnalysis(resumeText, jobDescription);

//     res.json({
//       message: "AI ATS Analysis",
//       result: aiResult
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/save", async (req, res) => {
  try {
    const data = req.body;

    const newResume = new Resume(data);
    await newResume.save();

    res.json({
      message: "Resume saved successfully",
      data: newResume
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
