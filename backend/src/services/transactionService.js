const buildQuery = require("../utils/queryBuilder");
const db = require("../utils/db");

const getTransactions = async (queryParams) => {
    try {
        const { dataQuery, countQuery, queryParams: sqlParams } = buildQuery(queryParams);

        const [dataResult, countResult] = await Promise.all([
            db.query(dataQuery, sqlParams),
            db.query(countQuery, sqlParams.slie(0, sqlParams.length - 2))
        ]);

        const totalCount = parseInt(countResult.rows[0].count);

        return {
            transactions: dataResult.rows,
            totalCount: totalCount,
            pageSize: 50,
            currentPage: parseInt(queryParams.page) || 1,
            totalPages: Math.ceil(totalCount/50),
        }
    }
    catch (err) {
        console.log(`error while fetching transactions: ${err}`);
        throw new Error(`db query failed`);
    }
}