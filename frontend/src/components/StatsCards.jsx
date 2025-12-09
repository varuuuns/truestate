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
    return (
        <div className="flex gap-4 mb-6">
            <Card title="Total units sold" mainValue="10" />
            <Card title="Total Amount" mainValue="₹89,000" subValue="(19 SRs)" />
            <Card title="Total Discount" mainValue="₹15,000" subValue="(45 SRs)" />
        </div>
    );
};
