require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('.env file missing');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
