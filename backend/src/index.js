const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.use('/api/v1/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`server listengin on port:${PORT}`);
})