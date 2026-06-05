const Pool = require('./db');

async function saveCommit(repo, commit_hash, message, commitTime){
    await Pool.query(
        'INSERT INTO commits (repo, commit_hash, message, commit_time) VALUES ($1, $2, $3, $4)',
        [repo, commit_hash, message, commitTime]
    );
}

async function getTodayCommits() {
    const result = await Pool.query(
        'SELECT repo,message,commit_time FROM commits WHERE commit_time >= CURRENT_DATE ORDER BY commit_time DESC'
    );

    return result.rows;
}
function buildSummary(commits) {
    return commits
        .map(commit => `• ${commit.message}`)
        .join('\n');
}

async function fetchDailySummary() {
    const result = await getTodayCommits();
    const summary = buildSummary(result);
    return summary;
}
module.exports = {
    saveCommit,
    getTodayCommits,
    buildSummary,
    fetchDailySummary
};

