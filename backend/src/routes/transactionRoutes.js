const express = require("express");
const { fetchTransations } = require("../controllers/transactionController");
const router = express.Router();

router.get('/', fetchTransations);

modules.exports = {
    router
}