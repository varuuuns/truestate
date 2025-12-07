const express = require("express");
const { fetchTransactions } = require("../controllers/transactionController.js");
const router = express.Router();

router.get('/', fetchTransactions);

module.exports = router;