const COLUMNS = [
    { key: 'transactionid', label: 'ID' },
    { key: 'date', label: 'Date' },
    { key: 'customer_name', label: 'Customer' },
    { key: 'product_category', label: 'Category' },
    { key: 'quantity', label: 'Qty' },
    { key: 'order_status', label: 'Status' },
    { key: 'final_amount', label: 'Amount' },
    { key: 'employee_name', label: 'Salesperson' }
]

const TransactionTable = ({ data, isLoading }) => {
    if (isLoading) {
        return <div className="text-center p-16 text-xl text-blue-600 font-semibold">Loading data, please wait...</div>
    }

    if (!data || data.length == 0) {
        return (
            <div className="text-center p-16 border border-gray-200 rounded-xl mt-6 bg-white shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-700">No Transactions Match Your Criteria</h3>
                <p className="text-gray-500 mt-2">
                    Try adjusting your search terms or clearing some active filters/ranges.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-lg rounded-xl mt-6 border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        {COLUMNS.map((col) => (
                            <th
                                key={col.key}
                                className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {data.map((transaction) => (
                        <tr key={transaction.transaction_id} className="hover:bg-blue-50 transition-colors duration-150">
                            {COLUMNS.map((col) => (
                                <td key={col.key} className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
                                    {/* Simple formatting for date and currency */}
                                    {col.key === 'date' ? new Date(transaction[col.key]).toLocaleDateString() :
                                        col.key === 'final_amount' ? `₹${parseFloat(transaction[col.key]).toFixed(2)}` :
                                            transaction[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionTable;