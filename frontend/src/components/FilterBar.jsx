import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, RefreshCw, Check, X, Calendar, Plus } from 'lucide-react';

const FILTER_OPTIONS = {
    region: { label: 'Customer Region', options: ['East', 'West', 'North', 'South', 'Central'] },
    gender: { label: 'Gender', options: ['Male', 'Female'] },
    category: { label: 'Product Category', options: ['Electronics', 'Clothing', 'Beauty'] },
    // tags handled separately 
    payment: { label: 'Payment Method', options: ['UPI', 'Credit Card', 'Debit Card', 'Cash', 'Wallet', 'Net Banking'] },
    status: { label: 'Order Status', options: ['Cancelled', 'Returned', 'Completed', 'Pending'] }
};

const DropdownWrapper = ({ isOpen, onClose, children, width = "w-56" }) => {
    if (!isOpen) return null;
    return (
        <div
            className={`absolute top-full left-0 mt-2 ${width} bg-white border border-gray-100 rounded-xl shadow-2xl shadow-gray-200/50 z-50 overflow-hidden animate-fade-in`}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    );
};

const TagFilter = ({ tags = [], onTagsChange, isOpen, setIsOpen }) => {
    const dropdownRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            if (!tags.includes(inputValue.trim())) {
                onTagsChange([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };

    const hasValue = tags.length > 0;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(isOpen ? null : 'tags');
                }}
                className={`
                    flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-all duration-200
                    ${hasValue
                        ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}
                `}
            >
                <span>Tags</span>
                {hasValue && (
                    <span className="flex items-center justify-center min-w-[1.25rem] h-5 bg-amber-100 text-amber-800 text-xs font-medium px-1 rounded-full">
                        {tags.length}
                    </span>
                )}
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <DropdownWrapper isOpen={isOpen} width="w-72">
                <div className="p-3">
                    <div className="flex flex-wrap gap-2 mb-3 max-h-32 overflow-y-auto">
                        {tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-md border border-amber-100">
                                {tag}
                                <X
                                    size={12}
                                    className="cursor-pointer hover:text-amber-900"
                                    onClick={() => removeTag(tag)}
                                />
                            </span>
                        ))}
                        {tags.length === 0 && <span className="text-xs text-gray-400 italic p-1">No tags selected</span>}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type & press Enter..."
                            className="w-full pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-gray-400"
                            autoFocus
                        />
                        <Plus size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="mt-2 text-[10px] text-gray-400 text-right">
                        Press Enter to add
                    </div>
                </div>
            </DropdownWrapper>
        </div>
    );
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
                    flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-all duration-200
                    ${hasValue
                        ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 shadow-sm'
                        : ' bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}
                `}
            >
                <Calendar size={14} className={hasValue ? 'text-amber-600' : 'text-gray-400'} />
                <span>Date</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <DropdownWrapper isOpen={isOpen} width="w-72">
                <div className="p-4 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">From</label>
                        <input
                            type="date"
                            value={startDate || ''}
                            onChange={(e) => onDateChange('startDate', e.target.value)}
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-gray-600"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">To</label>
                        <input
                            type="date"
                            value={endDate || ''}
                            onChange={(e) => onDateChange('endDate', e.target.value)}
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-gray-600"
                        />
                    </div>
                    {hasValue && (
                        <div className="pt-2 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => {
                                    onDateChange('startDate', '');
                                    onDateChange('endDate', '');
                                }}
                                className="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                            >
                                Clear Dates
                            </button>
                        </div>
                    )}
                </div>
            </DropdownWrapper>
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen]);

    const hasValue = activeValues.length > 0;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(isOpen ? null : id);
                }}
                className={`
                    flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-all duration-200
                    ${hasValue
                        ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}
                `}
            >
                <span>{label}</span>
                {hasValue && (
                    <span className="flex items-center justify-center min-w-[1.25rem] h-5 bg-amber-100 text-amber-800 text-xs font-medium px-1 rounded-full">
                        {activeValues.length}
                    </span>
                )}
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <DropdownWrapper isOpen={isOpen}>
                <div className="py-1 max-h-64 overflow-y-auto custom-scrollbar">
                    {FILTER_OPTIONS[id].options.map((option) => {
                        const isSelected = activeValues.includes(option);
                        return (
                            <div
                                key={option}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggle(option);
                                }}
                                className={`
                                    flex items-center px-4 py-2.5 cursor-pointer transition-colors group
                                    ${isSelected ? 'bg-amber-50/50' : 'hover:bg-gray-50'}
                                `}
                            >
                                <div className={`
                                    w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors duration-200
                                    ${isSelected
                                        ? 'bg-amber-500 border-amber-500 shadow-sm shadow-amber-200'
                                        : 'border-gray-300 group-hover:border-amber-400 bg-white'}
                                `}>
                                    {isSelected && <Check size={10} className="text-white stroke-[3]" />}
                                </div>
                                <span className={`text-sm ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                    {option}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </DropdownWrapper>
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
        ['region', 'gender', 'category', 'tags', 'payment', 'status'].forEach(key => {
            onFilterChange && onFilterChange(key, []);
        });
        onFilterChange && onFilterChange('startDate', '');
        onFilterChange && onFilterChange('endDate', '');
        onFilterChange && onFilterChange('sort', 'customer_name');
        onFilterChange && onFilterChange('order', 'asc');
    };

    if (!filters) return null;

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
            <div className="flex items-center gap-2 flex-wrap">
                <button
                    onClick={handleReset}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200"
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
                    id="payment"
                    label={FILTER_OPTIONS.payment.label}
                    activeValues={filters.payment}
                    onToggle={(val) => handleToggle('payment', val)}
                    isOpen={openDropdown === 'payment'}
                    setIsOpen={setOpenDropdown}
                />
                <FilterButton
                    id="status"
                    label={FILTER_OPTIONS.status.label}
                    activeValues={filters.status}
                    onToggle={(val) => handleToggle('status', val)}
                    isOpen={openDropdown === 'status'}
                    setIsOpen={setOpenDropdown}
                />

                <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block" />

                <TagFilter
                    tags={filters.tags}
                    onTagsChange={(newTags) => onFilterChange && onFilterChange('tags', newTags)}
                    isOpen={openDropdown === 'tags'}
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

            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">Sort:</span>
                <div className="relative">
                    <button
                        onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                        className={`
                            flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors
                            bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50
                        `}
                    >
                        <span>
                            {filters.sort === 'customer_name' ? 'Name' :
                                filters.sort === 'final_amount' ? 'Amount' :
                                    filters.sort === 'date' ? 'Date' : 'Select'}
                        </span>
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>

                    <DropdownWrapper isOpen={openDropdown === 'sort'} width="w-40" onClose={() => setOpenDropdown(null)}>
                        {[
                            { label: 'Customer Name', value: 'customer_name' },
                            { label: 'Date', value: 'date' },
                            { label: 'Amount', value: 'final_amount' }
                        ].map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => {
                                    if (filters.sort === opt.value) {
                                        onFilterChange('order', filters.order === 'asc' ? 'desc' : 'asc');
                                    } else {
                                        onFilterChange('sort', opt.value);
                                        onFilterChange('order', 'asc');
                                    }
                                    setOpenDropdown(null);
                                }}
                                className={`
                                    flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm
                                    ${filters.sort === opt.value ? 'bg-amber-50 text-amber-900 font-medium' : 'text-gray-700 hover:bg-gray-50'}
                                `}
                            >
                                <span>{opt.label}</span>
                                {filters.sort === opt.value && (
                                    <span className="text-xs text-amber-600 bg-amber-100 px-1.5 rounded">
                                        {filters.order === 'asc' ? 'A-Z' : 'Z-A'}
                                    </span>
                                )}
                            </div>
                        ))}
                    </DropdownWrapper>
                </div>
            </div>
        </div>
    );
};
