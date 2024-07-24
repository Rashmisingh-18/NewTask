// src/components/KpiCard.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getSnapshot } from '../Api';
import './KpiCard.css';

const KpiCard = ({ metric, segmentKey, segmentId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getSnapshot(metric, segmentKey, segmentId);
            setData(result);
        };
        fetchData();
    }, [metric, segmentKey, segmentId]);

    if (!data) return <div>Loading...</div>;

    const chartData = {
        labels: data.values.map((item) => item.date),
        datasets: [
            {
                label: 'Value',
                data: data.values.map((item) => item.value),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    return (
        <div className="kpi-card">
            <h3>{data.metric}</h3>
            <div className="kpi-value">{data.values[data.values.length - 1].value}</div>
            <div className="kpi-change">+2.3%</div>
            <div className="kpi-chart">
                <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default KpiCard;
