const fs = require("fs");
const pdfParse = require("pdf-parse");

const Resume = require("../models/Resume");
const { calculateATS } = require("../services/calculateATS");
const { getATSAnalysisGemini } = require("../services/geminiService");

const analyseResume = async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!jobDescription) {
      return res.status(400).json({ error: "jobDescription is required" });
    }

    // 🔥 Extract PDF text (STABLE)
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    let result;

    // 🤖 Try Gemini first
    try {
      result = await getATSAnalysisGemini(resumeText, jobDescription);
    } catch (err) {
      console.log("Gemini failed → using fallback ATS");

      const fallback = calculateATS(resumeText, jobDescription);

      result = {
        score: fallback.score,
        matchedSkills: fallback.matched,
        missingSkills: fallback.missing,
        suggestions: [
          ...fallback.suggestions,
          "Fallback ATS used (AI unavailable)"
        ]
      };
    }

    // 💾 Save to DB
    const saved = await Resume.create({
      resumeText,
      jobDescription,
      atsScore: result.score,
      matchedKeywords: result.matchedSkills,
      missingKeywords: result.missingSkills
    });

    // 🧹 Delete uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      message: "PDF analyzed successfully",
      source: result.suggestions?.includes("Fallback") ? "ATS" : "Gemini",
      result,
      data: saved
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { analyseResume };