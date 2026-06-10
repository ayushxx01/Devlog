const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();
console.log(process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateSummary(commits) {

    const commitMessages = commits
        .map(commit => commit.message)
        .join('\n');

const prompt = `You are generating a developer journal from Git commits.

The commits are grouped by repository.

Rules:

- Generate a separate section for each repository.
- Only use information explicitly present in the commits.
- Do not invent business impact.
- Do not speculate about user benefits.
- Do not assume why a feature was built.
- Combine related commits into a concise engineering summary.
- Ignore trivial commits:
  - test
  - testing
  - typo
  - docs
  - formatting
  - dependency bumps
- Focus on technical progress completed.
- Write 1-3 sentences per repository.
- Use clear developer-focused language.

Output Format:

## Repository Name

Summary
Commits: ${commitMessages}
`;
console.log(commitMessages);
console.log("Generating summary with Gemini API...");
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    console.log(response);

    return response.text;
}

module.exports = {
    generateSummary
};