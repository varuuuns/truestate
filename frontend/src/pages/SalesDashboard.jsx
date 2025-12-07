import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";


const BACKEND_URL = 'http://localhost:333/api/v1/transactions';
const PAGE_SIZE = 10;

const SalesDashboard = () => {
    const [transaction, setTransaction] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [meta, setMeta] = useState({});

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
            setTransaction(response.data.data);
            setMeta(response.data.meta);
        }
        catch (err) {
            console.log(`api error:${err}`);
            setTransaction([]);
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

            <TransactionTable data={transactions} isLoading={isLoading} />

            <PaginationControls meta={meta} setPage={setPage} currentPage={page} />
        </div>
    );
}

export default SalesDashboard;