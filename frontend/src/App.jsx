import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';
import { StatsCards } from './components/StatsCards';
import { TransactionTable } from './components/TransactionTable';
import { Pagination } from './components/Pagination';
import { fetchTransactions } from './api/api';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  // State for filters/sort
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    region: [],
    category: [],
    gender: [],
    sort: 'date',
    order: 'desc'
  });
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    loadTransactions();
  }, [debouncedSearch, filters, page]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        search: debouncedSearch,
        sortBy: filters.sort,
        sortOrder: filters.order,
        region: filters.region.join(','),
        category: filters.category.join(','),
        gender: filters.gender.join(','),
      };

      const response = await fetchTransactions(params);
      setData(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.error('Failed to load data', err);
      // Fallback or empty state handled by table
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="flex bg-white min-h-screen font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar onSearch={setSearch} searchValue={search} />

        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <StatsCards />

            <TransactionTable
              data={data}
              loading={loading}
              sort={filters.sort}
              order={filters.order}
              onSort={(field) => handleFilterChange('sort', field)}
              onToggleOrder={() => handleFilterChange('order', filters.order === 'asc' ? 'desc' : 'asc')}
            />

            <div className="mt-6 flex justify-center">
              <Pagination
                meta={meta}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
