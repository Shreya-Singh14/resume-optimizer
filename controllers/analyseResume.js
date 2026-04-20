const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const { getATSAnalysis } = require("../services/aiService");
const { getATSAnalysisGemini } = require("../services/geminiService");

const analyseResume = async (req, res) => {
    try {
        const { resumeText, jobDescription } = req.body;
        const aiResult = await getATSAnalysisGemini(resumeText, jobDescription);
        const resume = new Resume({ resumeText, jobDescription, atsScore: aiResult.score, matchedKeywords: aiResult.matchedSkills, missingKeywords: aiResult.missingSkills });
        await resume.save();
        res.json({
            message: "Gemini ATS Analysis",
            result: aiResult
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { analyseResume };