import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, RefreshCw, Check } from 'lucide-react';

const FILTER_OPTIONS = {
    region: { label: 'Customer Region', options: ['South', 'North', 'East', 'West'] },
    gender: { label: 'Gender', options: ['Male', 'Female'] },
    age: { label: 'Age Range', options: ['18-25', '26-35', '36-50', '50+'] },
    category: { label: 'Product Category', options: ['Clothing', 'Electronics', 'Furniture', 'Beauty', 'Sports'] },
    tags: { label: 'Tags', options: ['VIP', 'New', 'Recurring'] },
    payment: { label: 'Payment Method', options: ['Credit Card', 'Debit Card', 'UPI', 'Cash'] }
};

const FilterButton = ({ id, label, activeValues = [], onToggle, isOpen, setIsOpen }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(null);
            }
        };
        // Use mousedown to catch it before click helpers sometimes
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(isOpen ? null : id);
                }}
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
                <div
                    className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {FILTER_OPTIONS[id].options.map((option) => {
                        const isSelected = activeValues.includes(option);
                        return (
                            <div
                                key={option}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggle(option);
                                }}
                                className="flex items-center px-4 py-2 hover:bg-amber-50 cursor-pointer transition-colors group"
                            >
                                <div className={`
                                    w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors
                                    ${isSelected
                                        ? 'bg-amber-500 border-amber-500'
                                        : 'border-gray-300 group-hover:border-amber-400'}
                                `}>
                                    {isSelected && <Check size={10} className="text-white" />}
                                </div>
                                <span className={`text-sm ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                    {option}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export const FilterBar = ({ filters, onFilterChange }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleToggle = (key, value) => {
        const currentValues = filters && filters[key] ? filters[key] : [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        onFilterChange && onFilterChange(key, newValues);
    };

    const handleReset = () => {
        ['region', 'gender', 'age', 'category', 'tags', 'payment'].forEach(key => {
            onFilterChange && onFilterChange(key, []);
        });
    };

    if (!filters) return null;

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3 flex-wrap">
                <button
                    onClick={handleReset}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    title="Reset Filters"
                >
                    <RefreshCw size={18} />
                </button>

                {Object.keys(FILTER_OPTIONS).map(key => (
                    <FilterButton
                        key={key}
                        id={key}
                        label={FILTER_OPTIONS[key].label}
                        activeValues={filters[key]}
                        onToggle={(val) => handleToggle(key, val)}
                        isOpen={openDropdown === key}
                        setIsOpen={setOpenDropdown}
                    />
                ))}
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
