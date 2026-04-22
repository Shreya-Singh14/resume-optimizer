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
    await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    );

    const text = response.data.candidates[0].content.parts[0].text;

    // clean markdown if present
    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/```json|```/g, "").trim();
    }

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini error:", error.response?.data || error.message);

    // 🔥 IMPORTANT: throw error instead of returning fallback
    throw new Error("Gemini failed");
  }
}

module.exports = { getATSAnalysisGemini };
