const { getTransactions } = require("../services/transactionService")

const fetchTransations = async (req, res) => {
    try {
        const data = await getTransactions(req.query);

        res.status(200).json({
            data: data.transactions,
            meta: {
                totalCount: data.totalCount,
                pageSize: data.pageSize,
                currentPage: data.currentPage,
                ttoalPages: data.totalPages
            }
        })
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

module.exports = {
    fetchTransations
}