// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sundial-fe-interview.vercel.app/api',
});

export const getMetrics = async () => {
    const response = await api.get('/metrics');
    return response.data.data;
};

export const getSegments = async () => {
    const response = await api.get('/segments');
    return response.data.data;
};

export const getSnapshot = async (metric, segmentKey, segmentId) => {
    const response = await api.post('/snapshot', { metric, segmentKey, segmentId });
    return response.data.data;
};
