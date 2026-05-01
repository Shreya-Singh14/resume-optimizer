const { rewriteResumeGemini } = require("../services/rewriteService");

const rewriteResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const improvedResume = await rewriteResumeGemini(
      resumeText,
      jobDescription
    );

    res.json({
      message: "Resume rewritten successfully",
      improvedResume
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { rewriteResume };