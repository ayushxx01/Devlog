// test.js
require('dotenv').config();
const { getTodayCommits, buildSummary } = require('./service');

(async () => {
    const commits = await getTodayCommits();

    console.log(commits);

    const summary = buildSummary(commits);

    console.log(summary);
})();