const { Pool, Query } = require("pg");

const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: { rejectUnauthorized: false },
})

module.exports = {
    qeuery: (text, params) => Query(text, params),
    pool
}
