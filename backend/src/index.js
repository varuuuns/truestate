const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ quiet: true });
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3333;

app.use('/api/v1/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
});