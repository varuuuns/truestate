import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333/api/v1',
    timeout: 10000,
});

export const fetchTransactions = async (params) => {
    try {
        const response = await api.get('/transactions', { params });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchStats = async () => {
    try {
        const response = await api.get('/transactions/stats');
        return response.data;
    } catch (error) {
        console.error('Stats Error:', error);
        throw error;
    }
};

export default api;
