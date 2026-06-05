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

const prompt = `
You are generating a daily development log for social media.

Given the commit messages below:

- Ignore trivial commits
- Ignore testing commits
- Ignore commit names like test, testing, fix typo, etc.
- Group related work together
- Explain what was actually achieved
- Write 2-4 concise sentences
- Focus on progress and outcomes rather than implementation details

Commit Messages:
${commitMessages}
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