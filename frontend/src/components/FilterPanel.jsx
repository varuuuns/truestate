
const REGIONS = ['East', 'West', 'North', 'South', 'Central'];
const GENDERS = ['Male', 'Female'];
const CATEGORIES = ['Electronics', 'Clothing', 'Beauty'];
const PAYMENT_METHODS = ['UPI', 'Credit Card', 'Debit Card', 'Cash', 'Wallet'];

const SORT_OPTIONS = [
    { label: 'Date (Newest first)', value: 'date', dir: 'DESC' },
    { lable: 'Quantity', value: 'quantity', dir: 'DESC' },
    { label: 'Customer Name (A-Z)', value: 'customerName', dir: 'ASC' },
    { lablel: 'Final Amount (High/Low)', value: 'finalAmount', dir: 'DESC' }
]

const FilterPanel = ({filters, onFilterChange, onSortChange, currentSort}) => {
    const handleMultiSelectChange = (e, key) => {
        onFilterChange({ [key]: e.target.value });
    };

    const handleAgeRangeChange = (e, bound) => {
        const { name, value } = e.target;
        onFilterChange({ [name]: value });
    }

    const handleSortSelect = (e) => {
        const [value, dir] = e.target.value.split('|');
        onSortChange({ sortBy: value, sortDir: dir });
    }

    const handleClearFilers = () => {
        onFilterChange({});
        onSortChange({ sortBy: 'date', sortDir: 'DESC' });
    }

    return (
        <div className="flex flex-col space-y-4 p-5 bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-lg">
            <h3 className="text-xl font-semibold text-gray-800">Filtering & Sorting</h3>

            {/* --- MULTI-SELECT FILTERS --- */}
            <div className="flex flex-wrap gap-3 border-b pb-4 border-gray-100">

                <select
                    value={filters.region || ''}
                    onChange={(e) => handleMultiSelectChange(e, 'region')}
                    className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500"
                >
                    <option value="">Customer Region</option>
                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>

                <select
                    value={filters.gender || ''}
                    onChange={(e) => handleMultiSelectChange(e, 'gender')}
                    className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500"
                >
                    <option value="">Gender</option>
                    {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>

                <select
                    value={filters.category || ''}
                    onChange={(e) => handleMultiSelectChange(e, 'category')}
                    className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500"
                >
                    <option value="">Product Category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select
                    value={filters.paymentMethod || ''}
                    onChange={(e) => handleMultiSelectChange(e, 'paymentMethod')}
                    className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500"
                >
                    <option value="">Payment Method</option>
                    {PAY_METHODS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                {/* Tags Filter (Complex Multi-Select) */}
                <TagsFilter selectedTags={filters.tags || []} onFilterChange={onFilterChange} />
            </div>

            {/* --- RANGE FILTERS & SORTING --- */}
            <div className="flex flex-wrap gap-4 items-center justify-between">

                {/* Age Range Input */}
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600 font-medium">Age Range:</span>
                    <input
                        type="number"
                        name="minAge"
                        value={filters.minAge || ''}
                        onChange={handleRangeChange}
                        placeholder="Min"
                        className="w-16 p-1.5 border border-gray-300 rounded-lg"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        name="maxAge"
                        value={filters.maxAge || ''}
                        onChange={handleRangeChange}
                        placeholder="Max"
                        className="w-16 p-1.5 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Date Range Input */}
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600 font-medium">Date Range:</span>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate || ''}
                        onChange={handleRangeChange}
                        className="p-1.5 border border-gray-300 rounded-lg"
                    />
                    <span>to</span>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate || ''}
                        onChange={handleRangeChange}
                        className="p-1.5 border border-gray-300 rounded-lg"
                    />
                </div>
            </div>

            {/* --- SORTING AND CLEAR --- */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Sort by:</span>
                    <select
                        onChange={handleSortSelect}
                        value={`${currentSort.sortBy}|${currentSort.sortDir}`}
                        className="p-2 border border-blue-500 rounded-lg text-sm font-medium bg-blue-50 text-blue-700"
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.value} value={`${opt.value}|${opt.dir}`}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleClearFilters}
                    className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default FilterPanel;