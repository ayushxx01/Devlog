const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./devlog.db', (err)=> {
    if (err) {
        console.log("Error opening database", err);
    }

    else {
        console.log("connected to database");
        db.run(`CREATE TABLE IF NOT EXISTS commits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            repo TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
})


module.exports = db;