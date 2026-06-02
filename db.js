const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./devlog.db', (err)=> {
    if (err) {
        console.log("Error opening database", err);
    }

    else {
        console.log("connected to database");
    }
})


module.exports = db;