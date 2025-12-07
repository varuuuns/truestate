const SORT_COLUMNS = {
    date: 'date',
    quantity: 'quantity',
    customerName: 'customerName',
    finalAmout: 'finalAmount'
}

const buildQuery = (params) => {
    let whereClauses = [];
    let queryParams = [];
    let joins = new Set();
    let paramIndex = 1;

    // SERACH for customer_name , phone_number
    if (params.search?.trim()) {
        joins.add(`customers c ON t.customer_id=c.customer_id`);
        whereClauses.push(`c.customer_name LIKE $${paramIndex} OR c.phone_number LIKE $${paramIndex}`);
        queryParams.push(`%${params.search.trim()}%`);
        paramIndex++;
    }

    // FILETER for customer_region, gender, age range, product_category, tags, payment_method, date range
    const addMultiSelect = (param, column, join = null) => {
        const values = params[param];
        if (values) {
            if (join) joins.add(join);
            const arr = Array.isArray(values) ? values : values[values];
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
        queryParams.push(params.tags);
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
            whereClauses.push(`c.age<=$${paramsIndex}`);
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
        queryParams.push(params.startDate);
        paramIndex++;
    }

    // SORTING date, quantity,customer_name
    const sortBy = SORT_COLUMNS[params.sortBy] || 't.date';
    const sortDir = params.sortDir?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const orderByClause = `ORDER BY ${sortBy} ${sortDir}`;

    // PAGINATION
    const pageSize = Math.min(Number(params.limit) || 50, 100); // default 50, max 100
    let paginationClause = `LIMIT $${paramIndex}`;
    let cursorClause = '';
    queryParams.push(pageSize);

    if (params.cursor && params.sortBy === 'date') {
        const comparator = (params.sortDir?.toUpperCase() === 'ASC') ? '>' : '<';
        cursorClause = `t.date ${comparator} $${++paramIndex}`;
        queryParams.push(params.cursor);
        whereClauses.push(cursorClause);
    }

}