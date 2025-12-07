const SORT_COLUMNS = {
    date: 't.date',
    quantity: 't.quantity',
    customerName: 'c.customerName',
    finalAmout: 't.finalAmount'
}

const buildQuery = (params) => {
    let whereClauses = [];
    let queryParams = [];
    let joins = new Set();
    let paramIndex = 1;

    // SERACH for customer_name , phone_number
    if (params.search?.trim()) {
        joins.add(`customers c ON t.customer_id=c.customer_id`);
        whereClauses.push(`c.search_vector @@ to_tsquery('english', $${paramIndex})`);
        queryParams.push(params.search.trim().split(/\s+/).join(' & ') + ':*');
        paramIndex++;
    }

    // FILETER for customer_region, gender, age range, product_category, tags, payment_method, date range
    const addMultiSelect = (param, column, join = null) => {
        const values = params[param];
        if (values) {
            if (join) joins.add(join);
            const arr = Array.isArray(values) ? values : String(values).split(',');
            whereClauses.push(`${column}=ANY($${paramIndex})`);
            queryParams.push(arr);
            paramIndex++;
        }
    }

    // customer_regin, gender, product_category, payment_method
    addMultiSelect('region', 'c.customer_region', 'customers c ON t.customer_id = c.customer_id');
    addMultiSelect('gender', 'c.gender', 'customers c ON t.customer_id = c.customer_id');
    addMultiSelect('category', 'p.product_category', 'products p ON t.product_id = p.product_id');
    addMultiSelect('paymentMethod', 't.payment_method');

    // tags
    if (params.tags?.length) {
        joins.add('products p ON t.product_id=product_id');
        whereClauses.push(`p.tags @>$${paramIndex}::text[]`);
        const tagsArray = Array.isArray(params.tags) ? params.tags : String(params.tags).split(',');
        queryParams.push(tagsArray);
        paramIndex++;
    }

    // age range
    if (params.minAge || params.maxAge) {
        joins.add('customers c ON t.customer_id=c.customer_id');
        if (params.minAge) {
            whereClauses.push(`c.age>=$${paramIndex}`);
            queryParams.push(Number(params.minAge));
            paramIndex++;
        }
        if (params.maxAge) {
            whereClauses.push(`c.age<=$${paramIndex}`);
            queryParams.push(Number(params.maxAge));
            paramIndex++;
        }
    }

    // date range
    if (params.startDate) {
        whereClauses.push(`t.date>=$${paramIndex}`);
        queryParams.push(params.startDate);
        paramIndex++;
    }
    if (params.endDate) {
        whereClauses.push(`t.date<=$${paramIndex}`);
        queryParams.push(params.endDate);
        paramIndex++;
    }

    // SORTING date, quantity,customer_name
    const sortBy = SORT_COLUMNS[params.sortBy] || 't.date';
    const sortDir = params.sortDir?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const orderByClause = `ORDER BY ${sortBy} ${sortDir}`;

    // PAGINATION
    const pageSize = 50;
    const page = parseInt(params.page) || 1;
    const offset = (page - 1) * pageSize;
    const paginationClause = `LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(pageSize, offset);

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const joinString = Array.from(joins).join('');

    const selectClause = `SELECT t.*, c.customer_name,c.phone_number,p.product_name,p.product_category,p.tags`;

    const dataQuery = `${selectClause} FROM transactions t ${joinString} ${whereClause} ${orderByClause} ${paginationClause}`;

    const countQuery = `SELECT COUNT(t.transaction_id) FROM transactions t ${joinString} ${whereClause}`;

    return { dataQuery, countQuery, queryParams };

}

module.exports = {
    buildQuery
}