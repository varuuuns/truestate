require('dotenv').config({ quiet: true });

const url = process.env.DATABASE_URL;
console.log("Checking DATABASE_URL...");

if (!url) {
    console.error("ERROR: DATABASE_URL is undefined or empty");
} else {
    console.log("Type:", typeof url);
    console.log("Length:", url.length);
    console.log("Starts with:", url.substring(0, 15));
    // Check if valid URL
    try {
        const u = new URL(url);
        console.log("protocol:", u.protocol);
        console.log("hostname:", u.hostname);
        console.log("port:", u.port);
    } catch (e) {
        console.error("URL Parsing failed:", e.message);
    }
}
