const Pool = require('./db');

async function saveCommit(repo, commit_hash, message, commitTime){
    await Pool.query(
        'INSERT INTO commits (repo, commit_hash, message, commit_time) VALUES ($1, $2, $3, $4)',
        [repo, commit_hash, message, commitTime]
    );
}
module.exports = {
    saveCommit,
};