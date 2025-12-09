const supabase = require('../config/supabase');

const getTransactions = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 200,
            search = '',
            sortBy = 'date',
            sortOrder = 'desc',
            region,
            category,
            payment_method,
            minPrice,
            maxPrice,
            gender,
            startDate,
            endDate,
            tags,
            status
        } = req.query;

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('transactions')
            .select(`
                *,
                customers!inner (*),
                products!inner (*)
            `, { count: 'exact' });

        if (search) {
            query = query.or(`customer_name.ilike.%${search}%,phone_number.ilike.%${search}%`, { foreignTable: 'customers' });
        }

        if (region) query = query.in('customers.customer_region', region.split(','));
        if (category) query = query.in('products.product_category', category.split(','));
        if (payment_method) query = query.in('payment_method', payment_method.split(','));
        if (gender) query = query.in('customers.gender', gender.split(','));

        if (tags) query = query.in('customers.customer_type', tags.split(','));
        if (status) query = query.in('order_status', status.split(','));

        if (minPrice) query = query.gte('final_amount', minPrice);
        if (maxPrice) query = query.lte('final_amount', maxPrice);

        if (startDate) query = query.gte('date', startDate);
        if (endDate) query = query.lte('date', endDate);

        const safeSortOrder = (sortOrder || 'desc').trim().toLowerCase();
        const safeSortBy = (sortBy || 'date').trim();

        if (['date', 'final_amount', 'quantity'].includes(safeSortBy)) {
            query = query.order(safeSortBy, { ascending: safeSortOrder === 'asc' });
        } else if (safeSortBy === 'customer_name') {
            query = query.order('customers(customer_name)', { ascending: safeSortOrder === 'asc' });
        }

        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) {
            throw error;
        }

        const flatData = data.map(item => ({
            ...item,
            customer_name: item.customers?.customer_name,
            phone: item.customers?.phone_number,
            region: item.customers?.customer_region,
            age: item.customers?.age,
            gender: item.customers?.gender,

            product_name: item.products?.product_name,
            product_id: item.products?.product_id,
            category: item.products?.product_category,
            brand: item.products?.brand,
            employee: item.employee_name,

            customers: undefined,
            products: undefined
        }));

        res.json({
            data: flatData,
            meta: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });

    } catch (err) {
        console.error('Error fetching transactions:', err);

        // Check for timeout-related errors
        const isTimeout = err.message?.toLowerCase().includes('timeout') ||
            err.code === '57014' || // query_canceled
            err.code === 'ETIMEDOUT';

        if (isTimeout) {
            return res.status(504).json({
                error: 'Gateway Timeout',
                details: 'The database query took too long to execute.'
            });
        }

        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

const getStats = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .select(`
                final_amount,
                payment_method,
                customers!inner(customer_region),
                products!inner(product_category)
            `);

        if (error) throw error;

        const totalSales = data.reduce((sum, item) => sum + (item.final_amount || 0), 0);
        const count = data.length;

        res.json({ totalSales, count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getTransactions,
    getStats
};