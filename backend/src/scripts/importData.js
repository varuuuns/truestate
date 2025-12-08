require('dotenv').config({ path: '../../.env' }); // Adjust path to .env
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const supabase = require('../config/supabase');

const DATA_FILE = path.join(__dirname, '../../data/sales_data.csv');

const importData = async () => {
    const results = [];

    // Check if file exists
    if (!fs.existsSync(DATA_FILE)) {
        console.error(`Data file not found at ${DATA_FILE}`);
        console.log("Please copy the dataset to 'backend/data/sales_data.csv'");
        process.exit(1);
    }

    fs.createReadStream(DATA_FILE)
        .pipe(csv())
        .on('data', (data) => {
            // Transform keys to match database columns if necessary
            // Map CSV headers to DB columns
            const mappedData = {
                // Adjust these mappings based on actual CSV headers
                customer_id: data['Customer ID'],
                customer_name: data['Customer Name'],
                phone: data['Phone Number'],
                gender: data['Gender'],
                age: parseInt(data['Age']) || null,
                region: data['Customer Region'],
                customer_type: data['Customer Type'],

                product_id: data['Product ID'],
                product_name: data['Product Name'],
                brand: data['Brand'],
                category: data['Product Category'],
                tags: data['Tags'], // Might need parsing if array

                quantity: parseInt(data['Quantity']) || 0,
                price: parseFloat(data['Price per Unit']) || 0,
                discount: parseFloat(data['Discount Percentage']) || 0,
                total: parseFloat(data['Total Amount']) || 0,
                final_amount: parseFloat(data['Final Amount']) || 0,

                date: data['Date'] ? new Date(data['Date']) : new Date(),
                payment_method: data['Payment Method'],
                status: data['Order Status'],
                delivery_type: data['Delivery Type'],
                store_id: data['Store ID'],
                store_location: data['Store Location'],
                salesperson_id: data['Salesperson ID'],
                employee_name: data['Employee Name']
            };
            results.push(mappedData);
        })
        .on('end', async () => {
            console.log(`Parsed ${results.length} rows.`);

            // Insert in batches
            const BATCH_SIZE = 100;
            for (let i = 0; i < results.length; i += BATCH_SIZE) {
                const batch = results.slice(i, i + BATCH_SIZE);
                const { error } = await supabase.from('transactions').insert(batch);
                if (error) {
                    console.error('Error inserting batch:', error);
                } else {
                    console.log(`Inserted batch ${i / BATCH_SIZE + 1}`);
                }
            }
            console.log('Import finished.');
        });
};

importData();
