import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const COLUMNS = [
    { key: 'customer_name', label: 'Customer' },
    { key: 'product_name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'region', label: 'Region' },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'final_amount', label: 'Amount', sortable: true },
];

export const TransactionTable = ({ data, loading, sort, order, onSort, onToggleOrder }) => {
    if (loading) {
        return (
            <div className="glass-panel p-8 text-center text-slate-400 animate-pulse">
                Loading data...
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="glass-panel p-8 text-center text-slate-400">
                No transactions found.
            </div>
        );
    }

    return (
        <div className="glass-panel overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800/50 text-slate-300 uppercase font-medium border-b border-slate-700">
                        <tr>
                            {COLUMNS.map((col) => (
                                <th
                                    key={col.key}
                                    className="px-6 py-4 cursor-pointer hover:text-white transition-colors"
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
                                            <span className="text-slate-500">
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
                    <tbody className="divide-y divide-slate-800">
                        {data.map((row, idx) => (
                            <motion.tr
                                key={row.id || idx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="hover:bg-slate-800/30 transition-colors"
                            >
                                <td className="px-6 py-4 font-medium text-slate-200">{row.customer_name}</td>
                                <td className="px-6 py-4 text-slate-400">{row.product_name}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300">
                                        {row.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-400">{row.region}</td>
                                <td className="px-6 py-4 text-slate-400">
                                    {new Date(row.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 font-mono font-semibold text-emerald-400">
                                    ${Number(row.final_amount).toFixed(2)}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};