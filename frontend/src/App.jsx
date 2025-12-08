import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { TransactionTable } from './components/TransactionTable';
import { Pagination } from './components/Pagination';
import { fetchTransactions } from './api/api';
import { useDebounce } from './hooks/useDebounce'; // utility hook I'll create

function App() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError('Failed to load data. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to page 1 on filter change
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Retail Dashboard
          </h1>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onChange={handleFilterChange} />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <TransactionTable
              data={data}
              loading={loading}
              sort={filters.sort}
              order={filters.order}
              onSort={(field) => handleFilterChange('sort', field)}
              onToggleOrder={() => handleFilterChange('order', filters.order === 'asc' ? 'desc' : 'asc')}
            />
            <Pagination
              meta={meta}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
