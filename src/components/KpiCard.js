import React from 'react';
import { Line } from 'react-chartjs-2';
import './KpiCard.css';

const KpiCard = ({ title, value, change, chartData }) => {
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="kpi-card">
            <h3>{title}</h3>
            <div className="kpi-value">{value}</div>
            <div className="kpi-change">{change}</div>
            <div className="kpi-chart">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default KpiCard;
