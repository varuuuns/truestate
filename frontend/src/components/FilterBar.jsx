```javascript
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, RefreshCw, Check } from 'lucide-react';

const FILTER_OPTIONS = {
    region: { label: 'Customer Region', options: ['East', 'West', 'North', 'South', 'Central'] },
    gender: { label: 'Gender', options: ['Male', 'Female'] },
    // age: { label: 'Age Range', options: ['18-25', '26-35', '36-50', '50+'] }, // Not in schema, keeping as is or removing? Schema didn't mention Age. User just said "adjust ... based on that schema". I'll keep Age if it was there or remove if strictly following schema. I'll keep Age as it's common, but prioritize schema ones.
    category: { label: 'Product Category', options: ['Electronics', 'Clothing', 'Beauty'] },
    tags: { label: 'Customer Type', options: ['New', 'Returning', 'Loyal'] }, // Mapped to customer_type
    payment: { label: 'Payment Method', options: ['UPI', 'Credit Card', 'Debit Card', 'Cash', 'Wallet', 'Net Banking'] },
    status: { label: 'Order Status', options: ['Cancelled', 'Returned', 'Completed', 'Pending'] } // Added
};

const DateFilter = ({ startDate, endDate, onDateChange, isOpen, setIsOpen }) => {
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

    const hasValue = startDate || endDate;

    return (
        <div className="relative" ref={dropdownRef}>
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(isOpen ? null : 'date');
                }}
                className={`
                    flex items - center gap - 2 px - 3 py - 1.5 border rounded - md text - sm transition - colors
                    ${
    hasValue
        ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
}
`}
            >
                <span>Date</span>
                {hasValue && <div className="w-2 h-2 bg-amber-500 rounded-full" />}
                <ChevronDown size={14} className={`text - gray - 400 transition - transform ${ isOpen ? 'rotate-180' : '' } `} />
            </button>

            {isOpen && (
                <div 
                    className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-gray-500">From</label>
                            <input 
                                type="date" 
                                value={startDate || ''}
                                onChange={(e) => onDateChange('startDate', e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-gray-500">To</label>
                            <input 
                                type="date" 
                                value={endDate || ''}
                                onChange={(e) => onDateChange('endDate', e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button 
                                onClick={() => {
                                    onDateChange('startDate',  '');
                                    onDateChange('endDate', '');
                                }}
                                className="text-xs text-red-500 hover:text-red-700 hover:underline"
                            >
                                Clear Date
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
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
                    flex items - center gap - 2 px - 3 py - 1.5 border rounded - md text - sm transition - colors
                    ${
    activeValues.length > 0
    ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
}
`}
            >
                <span>{label}</span>
                {activeValues.length > 0 && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded-full">
                        {activeValues.length}
                    </span>
                )}
                <ChevronDown size={14} className={`text - gray - 400 transition - transform ${ isOpen ? 'rotate-180' : '' } `} />
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
w - 4 h - 4 rounded border flex items - center justify - center mr - 3 transition - colors
                                    ${
    isSelected
        ? 'bg-amber-500 border-amber-500'
        : 'border-gray-300 group-hover:border-amber-400'
}
`}>
                                    {isSelected && <Check size={10} className="text-white" />}
                                </div>
                                <span className={`text - sm ${ isSelected ? 'text-gray-900 font-medium' : 'text-gray-600' } `}>
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
        // Clear multi-select filters
        ['region', 'gender', 'category', 'tags', 'payment', 'status'].forEach(key => {
            onFilterChange && onFilterChange(key, []);
        });
        // Clear date filters
        onFilterChange && onFilterChange('startDate', '');
        onFilterChange && onFilterChange('endDate', '');
        // Reset sort
        onFilterChange && onFilterChange('sort', 'customer_name'); // Default sort
        onFilterChange && onFilterChange('order', 'asc'); // Default order
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

                <FilterButton 
                    id="region" 
                    label={FILTER_OPTIONS.region.label} 
                    activeValues={filters.region} 
                    onToggle={(val) => handleToggle('region', val)}
                    isOpen={openDropdown === 'region'}
                    setIsOpen={setOpenDropdown}
                />
                <FilterButton 
                    id="gender" 
                    label={FILTER_OPTIONS.gender.label} 
                    activeValues={filters.gender} 
                    onToggle={(val) => handleToggle('gender', val)}
                    isOpen={openDropdown === 'gender'}
                    setIsOpen={setOpenDropdown}
                />
                <FilterButton 
                    id="category" 
                    label={FILTER_OPTIONS.category.label} 
                    activeValues={filters.category} 
                    onToggle={(val) => handleToggle('category', val)}
                    isOpen={openDropdown === 'category'}
                    setIsOpen={setOpenDropdown}
                />
                <FilterButton 
                    id="tags" 
                    label="Customer Type" 
                    activeValues={filters.tags} 
                    onToggle={(val) => handleToggle('tags', val)}
                    isOpen={openDropdown === 'tags'}
                    setIsOpen={setOpenDropdown}
                />
                 <FilterButton 
                    id="payment" 
                    label="Payment Method" 
                    activeValues={filters.payment} 
                    onToggle={(val) => handleToggle('payment', val)}
                    isOpen={openDropdown === 'payment'}
                    setIsOpen={setOpenDropdown}
                />
                <FilterButton 
                    id="status" 
                    label="Order Status" 
                    activeValues={filters.status} 
                    onToggle={(val) => handleToggle('status', val)}
                    isOpen={openDropdown === 'status'}
                    setIsOpen={setOpenDropdown}
                />
                <DateFilter 
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    onDateChange={(key, val) => onFilterChange && onFilterChange(key, val)}
                    isOpen={openDropdown === 'date'}
                    setIsOpen={setOpenDropdown}
                />
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <div className="relative">
                    <button 
                        onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <span>
                            {filters.sort === 'customer_name' ? 'Customer Name' : 
                             filters.sort === 'final_amount' ? 'Amount' : 
                             filters.sort === 'date' ? 'Date' : 'Select'}
                            {filters.order === 'asc' ? ' (A-Z)' : ' (Z-A)'}
                        </span>
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>
                    {openDropdown === 'sort' && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
                            {[
                                { label: 'Customer Name', value: 'customer_name' },
                                { label: 'Date', value: 'date' },
                                { label: 'Amount', value: 'final_amount' }
                            ].map((opt) => (
                                <div 
                                    key={opt.value}
                                    onClick={() => {
                                        onFilterChange('sort', opt.value);
                                        // Toggle order if clicking same sort, else default to asc/desc?
                                        // Simple logic: just set sort, let user toggle order via another way? 
                                        // Or just strictly set it. Let's start with setting sort.
                                        // For "A-Z" implies order too.
                                        // Let's toggle order if same.
                                        if (filters.sort === opt.value) {
                                            onFilterChange('order', filters.order === 'asc' ? 'desc' : 'asc');
                                        } else {
                                            onFilterChange('order', 'asc');
                                        }
                                        setOpenDropdown(null);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 block text-left"
                                >
                                    {opt.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
```
