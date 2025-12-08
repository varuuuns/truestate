const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ quiet: true });
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
})

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
}
