const dotenv = require('dotenv');
// Verify if loading .env works from the current directory
const result = dotenv.config({ quiet: true });
console.log("Dotenv result error:", result.error);
console.log("DATABASE_URL env var:", process.env.DATABASE_URL);

// Try to initialize Pool
try {
    const { Pool } = require("pg");
    console.log("Initializing pool...");
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });
    console.log("Pool initialized successfully. Config:", {
        connectionString: pool.options.connectionString,
    });
} catch (error) {
    console.error("Error initializing pool:", error);
}
