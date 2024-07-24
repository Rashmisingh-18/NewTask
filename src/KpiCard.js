import React from 'react';
import './KpiCard.css';

const KpiCard = ({ title, ticker, price, change, changePercent }) => {
    const isPositive = parseFloat(changePercent) >= 0;

    return (
        <div className="kpi-card">
            <div className="kpi-header">
                <h3>{title}</h3>
                <span>({ticker})</span>
            </div>
            <div className={`kpi-body ${isPositive ? 'positive' : 'negative'}`}>
                <h2>{price}</h2>
                <span>{change} ({changePercent}%)</span>
                <div className="chart"></div>
            </div>
        </div>
    );
};

export default KpiCard;
