import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, RefreshCw, X } from 'lucide-react';

const FILTER_OPTIONS = {
    region: { label: 'Customer Region', options: ['South', 'North', 'East', 'West'] },
    gender: { label: 'Gender', options: ['Male', 'Female'] },
    age: { label: 'Age Range', options: ['18-25', '26-35', '36-50', '50+'] }, // Mock ranges
    category: { label: 'Product Category', options: ['Clothing', 'Electronics', 'Furniture', 'Beauty', 'Sports'] },
    tags: { label: 'Tags', options: ['VIP', 'New', 'Recurring'] }, // Mock
    payment: { label: 'Payment Method', options: ['Credit Card', 'Debit Card', 'UPI', 'Cash'] } // Mock
};

const FilterButton = ({ id, label, activeValues = [], onToggle, isOpen, setIsOpen }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(isOpen ? null : id)}
                className={`
                    flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm transition-colors
                    ${activeValues.length > 0
                        ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}
                `}
            >
                <span>{label}</span>
                {activeValues.length > 0 && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded-full">
                        {activeValues.length}
                    </span>
                )}
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                    {FILTER_OPTIONS[id].options.map((option) => (
                        <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={activeValues.includes(option)}
                                onChange={() => onToggle(option)}
                                className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
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
