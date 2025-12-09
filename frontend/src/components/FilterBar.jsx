import React from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';

const FilterButton = ({ label }) => {
    return (
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors">
            <span>{label}</span>
            <ChevronDown size={14} className="text-gray-400" />
        </button>
    );
};

export const FilterBar = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3 flex-wrap">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    <RefreshCw size={18} />
                </button>

                <FilterButton label="Customer Region" />
                <FilterButton label="Gender" />
                <FilterButton label="Age Range" />
                <FilterButton label="Product Category" />
                <FilterButton label="Tags" />
                <FilterButton label="Payment Method" />
                <FilterButton label="Date" />
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                    <span>Customer Name (A-Z)</span>
                    <ChevronDown size={14} className="text-gray-400" />
                </button>
            </div>
        </div>
    );
};
