// test-ai.js

require('dotenv').config();

const { getTodayCommits } = require('../service.js');
const { generateSummary } = require('./aiService');

(async () => {
    const commits = await getTodayCommits();

    const summary = await generateSummary(commits);

    console.log(summary);
})();