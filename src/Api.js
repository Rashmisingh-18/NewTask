// src/api.js
import axios from 'axios';

// const api = axios.create({
//     baseURL: 'https://sundial-fe-interview.vercel.app/api',
// });

// export const getMetrics = async () => {
//     const response = await api.get('/metrics');
//     return response.data.data;
// };

// export const getSegments = async () => {
//     const response = await api.get('/segments');
//     return response.data.data;
// };

// export const getSnapshot = async (metric, segmentKey, segmentId) => {
//     const response = await api.post('/snapshot', { metric, segmentKey, segmentId });
//     return response.data.data;
// };

export const getMetrics = async () => {
    const response = await fetch('https://sundial-fe-interview.vercel.app/api/metrics');
    const data = await response.json();
    return data.data;
};

export const getSegments = async () => {
    const response = await fetch('https://sundial-fe-interview.vercel.app/api/segments');
    const data = await response.json();
    return data.data;
};

export const getSnapshot = async (metric, segmentKey, segmentId) => {
    const response = await fetch('https://sundial-fe-interview.vercel.app/api/snapshot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metric, segmentKey, segmentId }),
    });
    const data = await response.json();
    return data.data;
};
