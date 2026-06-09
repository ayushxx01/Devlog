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
You are an experienced software engineering assistant.

You will receive Git commit messages grouped by repository.

Your task is to analyze each repository independently and generate a concise development update.

Rules:

* Treat each repository as a separate project.
* Never mix work from different repositories.
* Ignore trivial commits such as:

  * test
  * testing
  * typo fixes
  * formatting changes
  * merge commits
  * dependency bumps unless significant
* Group related commits together.
* Focus on accomplishments and outcomes rather than implementation details.
* Explain what was achieved, not what files were edited.
* Write 1-3 concise sentences per repository.
* If a repository only contains trivial commits, omit it entirely.
* Use professional but simple language.

Output format:

## Repository Name

Summary of meaningful work completed.

Example:

## DevLog

Built the approval workflow for AI-generated development summaries and added support for storing approved entries for future publishing.

## Faraway

Improved the relationship journaling experience by refining onboarding flows and strengthening partner connection workflows.

Commits:
{{COMMITS}}

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