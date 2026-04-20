const axios = require("axios");

async function getATSAnalysisGemini(resumeText, jobDescription) {
  const prompt = `
Analyze the resume against the job description.

Return ONLY JSON in this format:
{
  "score": number,
  "matchedSkills": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  try {
const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  }
);

    const text = response.data.candidates[0].content.parts[0].text;

    // Extract JSON safely
    const cleaned = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini error:", error.response?.data || error.message);

    return {
      score: 0,
      matchedSkills: [],
      missingSkills: [],
      suggestions: ["AI analysis failed"],
    };
  }
}

module.exports = { getATSAnalysisGemini };
