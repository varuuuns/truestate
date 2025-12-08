try {
    const db = require('./src/utils/db.js');
    console.log("DB Module loaded.");
    console.log("Attempting query...");
    db.query('SELECT NOW()', [])
        .then(res => console.log("Query success:", res.rows[0]))
        .catch(err => {
            console.error("Query failed:");
            console.error(err); // Print full error object
            if (err.stack) console.error(err.stack);
        });
} catch (err) {
    console.error("Setup failed:");
    console.error(err);
}
