import React from 'react';
import { Info } from 'lucide-react';

const Card = ({ title, mainValue, subValue }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex-1 min-w-[200px] shadow-sm">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                <Info size={14} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">{mainValue}</span>
                {subValue && <span className="text-sm font-semibold text-gray-500">{subValue}</span>}
            </div>
        </div>
    );
};

export const StatsCards = () => {
    const stats = [
        { title: 'Total units sold', value: '870,685', change: '+12.5%', isPositive: true },
        { title: 'Total Amount', value: '₹2,199,002,958', change: '+8.2%', isPositive: true },
        { title: 'Total Discount', value: '₹550,010,938.79', change: '-2.4%', isPositive: false },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">{stat.title}</h3>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {stat.change}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
