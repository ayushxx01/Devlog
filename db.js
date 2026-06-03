const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

(async()=> {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS commits (
        id SERIAL PRIMARY KEY,
        repo TEXT NOT NULL,
        commit_hash TEXT NOT NULL,
        message TEXT NOT NULL,
        commit_time TIMESTAMP NOT NULL
            )`
        );
        console.log("✅ Database initialized");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
})();
module.exports = pool;