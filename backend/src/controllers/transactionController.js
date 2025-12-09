const supabase = require('../config/supabase');

const getTransactions = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
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
            endDate
        } = req.query;

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        // Select with joins. !inner is used to enforce filtering on related tables if needed.
        // We select *, customers(*), products(*) to get related data.
        let query = supabase
            .from('transactions')
            .select(`
                *,
                customers!inner (*),
                products!inner (*)
            `, { count: 'exact' });

        // Search (Full-text search emulation via related tables)
        if (search) {
            // Searching on Customer Name or Phone (in customers table)
            // 'OR' across tables is tricky without custom RPC, so we prioritize Customer Name / Phone
            query = query.or(`customer_name.ilike.%${search}%,phone_number.ilike.%${search}%`, { foreignTable: 'customers' });
        }

        // Filters - targets nested table columns
        if (region) query = query.in('customers.customer_region', region.split(','));
        if (category) query = query.in('products.product_category', category.split(','));
        if (payment_method) query = query.in('payment_method', payment_method.split(','));
        if (gender) query = query.in('customers.gender', gender.split(','));

        if (minPrice) query = query.gte('final_amount', minPrice);
        if (maxPrice) query = query.lte('final_amount', maxPrice);

        if (startDate) query = query.gte('date', startDate);
        if (endDate) query = query.lte('date', endDate);

        // Sorting
        // For simple fields on transaction table:
        if (['date', 'final_amount', 'quantity'].includes(sortBy)) {
            query = query.order(sortBy, { ascending: sortOrder === 'asc' });
        } else if (sortBy === 'customer_name') {
            // Sorthing by foreign table field
            query = query.order('customer_name', { foreignTable: 'customers', ascending: sortOrder === 'asc' });
        }

        // Pagination
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) {
            throw error;
        }

        // Flatten the response for the frontend
        const flatData = data.map(item => ({
            ...item,
            customer_name: item.customers?.customer_name,
            phone: item.customers?.phone_number,
            region: item.customers?.customer_region,
            age: item.customers?.age,
            gender: item.customers?.gender,

            product_name: item.products?.product_name,
            category: item.products?.product_category,
            brand: item.products?.brand,
            employee: item.employee_name, // Ensure this field is mapped to 'employee' key

            // Explicitly remove the nested objects to keep the response clean
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