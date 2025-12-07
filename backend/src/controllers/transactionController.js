const { getTransactions } = require("../services/transactionService.js")

const fetchTransactions = async (req, res) => {
    try {
        const data = await getTransactions(req.query);

        res.status(200).json({
            success:true,
            data: data.transactions,
            meta: {
                totalCount: data.totalCount,
                pageSize: data.pageSize,
                currentPage: data.currentPage,
                totalPages: data.totalPages
            }
        })
    }
    catch (err) {
        console.error(`controller error: ${err.message}`);
        res.status(500).json({
            success:false,
            msg: err
        });
    }
}

module.exports = {
    fetchTransactions
}