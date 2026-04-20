const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getATSAnalysis(resumeText, jobDescription) {
  const prompt = `
You are an ATS system.

Analyze the resume against the job description.

Return:
1. ATS score (0-100)
2. Matched skills
3. Missing skills
4. Suggestions to improve resume

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = { getATSAnalysis };