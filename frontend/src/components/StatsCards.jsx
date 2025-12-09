import React from 'react';

export const StatsCards = () => {
    const stats = [
        { title: 'Total units sold', value: '870,685' },
        { title: 'Total Amount', value: '₹2,199,002,958' },
        { title: 'Total Discount', value: '₹550,010,938.79' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">{stat.title}</h3>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
