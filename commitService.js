const {Pool} = require('pg');

async function saveCommit(repo, commit_hash, message, commitTime){
    await Pool.query(
        'INSERT INTO commits (repoo, commit_hash, message, commit_time) VALUES ($1, $2, $3, $4)',
        [repo, commit_hash, message, commitTime]
    );
}

module.exports = {
    saveCommit,
};