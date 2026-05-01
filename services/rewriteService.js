const axios = require("axios");

// 🔹 Fallback function
function fallbackRewrite(resumeText, jobDescription) {
  let improved = resumeText;

  const jdWords = jobDescription.toLowerCase().split(/\W+/);

  jdWords.forEach(word => {
    if (!improved.toLowerCase().includes(word) && word.length > 3) {
      improved += `\n- Experience with ${word}`;
    }
  });

  improved = improved
    .replace(/worked on/gi, "Developed")
    .replace(/made/gi, "Built")
    .replace(/did/gi, "Implemented");

  return improved;
}

// 🔹 Main function (AI + fallback)
async function rewriteResumeGemini(resumeText, jobDescription) {
  const prompt = `
Rewrite the resume to better match the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.log("Gemini failed → using fallback");

    return fallbackRewrite(resumeText, jobDescription);
  }
}

module.exports = { rewriteResumeGemini };