import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

const COLUMNS = [
    { key: 'transaction_id', label: 'Transaction ID' },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'customer_id', label: 'Customer ID' },
    { key: 'product_id', label: 'Product ID' },
    { key: 'customer_name', label: 'Customer name', sortable: true },
    { key: 'phone', label: 'Phone Number' },
    { key: 'gender', label: 'Gender' },
    { key: 'age', label: 'Age' },
    { key: 'category', label: 'Product Category' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'amount', label: 'Total Amount' },
    { key: 'region', label: 'Customer region' },
    { key: 'employee', label: 'Employee name' },
];

export const TransactionTable = ({ data, loading, sort, order, onSort, onToggleOrder }) => {
    if (loading) {
        return (
            <div className="bg-white p-8 text-center text-gray-400 animate-pulse border border-gray-200 rounded-lg">
                Loading data...
            </div>
        );
    }

    if (!data || !data.length) {
        return (
            <div className="bg-white p-8 text-center text-gray-400 border border-gray-200 rounded-lg">
                No transactions found.
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            {COLUMNS.map((col) => (
                                <th
                                    key={col.key}
                                    className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => {
                                        if (col.sortable) {
                                            if (sort === col.key) {
                                                onToggleOrder();
                                            } else {
                                                onSort(col.key);
                                            }
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && (
                                            <span className="text-gray-400">
                                                {sort === col.key ? (
                                                    order === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                                ) : (
                                                    <ArrowUpDown size={14} />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row, idx) => (
                            <motion.tr
                                key={row.id || idx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.02 }}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4 text-gray-500">
                                    {row.transaction_id || '1234567'}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {row.date ? new Date(row.date).toLocaleDateString() : '-'}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    {row.customer_id || 'CUST12016'}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    {row.product_id || 'PROD-001'}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    {row.customer_name || 'Neha Yadav'}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    <div className="flex items-center gap-2">
                                        {row.phone || '+91 9123456789'}
                                        <Copy size={12} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {row.gender || 'Female'}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {row.age || '25'}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    {row.category || 'Clothing'}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-medium text-center">
                                    {row.quantity || '01'}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-semibold">
                                    ₹ {row.final_amount ? Number(row.final_amount).toLocaleString() : '1,000'}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    {row.region || 'South'}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    {row.employee || '-'}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};