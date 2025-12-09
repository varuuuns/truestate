import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { TransactionTable } from "../components/TransactionTable";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { PaginationControls } from "../components/PaginationControls";
import ErrorModal from "../components/ErrorModal";

const BACKEND_URL = 'http://localhost:333/api/v1/transactions';
const PAGE_SIZE = 10;

const SalesDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [meta, setMeta] = useState({});
    const [showSortError, setShowSortError] = useState(false);

    const [searchQuery, setSearchQuery] = useState([]);
    const [filters, setFilters] = useState(false);
    const [sort, setSort] = useState({ sortBy: 'date', sortDir: 'DESC' });
    const [page, setPage] = useState(1);

    const fetchData = useCallback(async () => {
        setIsLoading(true);

        const params = {
            page: page,
            sortBy: sort.sortBy,
            sortDir: sort.sortDir,
            search: searchQuery,
            ...filters
        }

        const queryParams = Object.keys(params)
            .filter(key => params[key] !== '' && params[key] !== null && params[key] != undefined)
            .map(key => {
                const value = Array.isArray(params[key]) ? params[key].join(',') : params[key];
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            })
            .join('&');

        try {
            const response = await axios.get(`${BACKEND_URL}?${queryParams}`);
            setTransactions(response.data.data);
            setMeta(response.data.meta);
        }
        catch (err) {
            console.error('API Error Details:', {
                status: err.response?.status,
                data: err.response?.data,
                sortBy: sort.sortBy
            });

            const isTimeout = err.response?.status === 504 || err.code === 'ECONNABORTED';
            const isLikelySortFailure = err.response?.status === 500 && sort.sortBy === 'customer_name';

            if (isTimeout || isLikelySortFailure) {
                setShowSortError(true);
            }

            setTransactions([]);
            setMeta({ totalCount: 0, totalPages: 1, pageSize: PAGE_SIZE });
        }
        finally {
            setIsLoading(false);
        }
    }, [page, sort, searchQuery, filters]);

    const debouncedFetch = useMemo(() => debounce(fetchData, 400)
        , [fetchData]);

    useEffect(() => {
        if (searchQuery) debouncedFetch;
        else fetchData();
    }, [page, sort, filters, searchQuery, debouncedFetch]);

    const handleSearchChange = (search) => {
        setSearchQuery(search);
        setPage(1);
    }

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPage(1);
    }

    const handleSortChange = ({ sortBy, sortDir }) => {
        setSort({ sortBy, sortDir });
        setPage(1);
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Retail Sales Dashboard</h1>

            <div className="flex justify-between items-start mb-6 gap-6">
                <SearchBar onSearchChange={handleSearchChange} initialSearch={searchQuery} />

                <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                    currentSort={sort}
                />
            </div>

            <TransactionTable
                data={transactions}
                loading={isLoading}
                sort={sort.sortBy}
                order={sort.sortDir?.toLowerCase()}
                onSort={(key) => handleSortChange({ sortBy: key, sortDir: sort.sortDir })}
                onToggleOrder={() => handleSortChange({ sortBy: sort.sortBy, sortDir: sort.sortDir === 'ASC' ? 'DESC' : 'ASC' })}
            />

            <PaginationControls meta={meta} setPage={setPage} currentPage={page} />

            <ErrorModal
                isOpen={showSortError}
                onClose={() => setShowSortError(false)}
                title="Sorting Unavailable"
                message="The database has too many values, so its taking up lot of time to search. Sorting by Customer Name on the full dataset is unavailable due to performance limits. Please apply filters (e.g., Select a specific Region or Date Range) to reduce the results, then try sorting again."
            />
        </div>
    );
}

export default SalesDashboard;
