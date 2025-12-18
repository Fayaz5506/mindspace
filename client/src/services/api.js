import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: `${API_URL}/`,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Insights
export const getInsights = () => api.get('insights');

// Community & Moderation
export const getFlaggedPosts = () => api.get('community/moderation');
export const updatePostStatus = (id, status) => api.put(`community/${id}/status`, { status });

export default api;
