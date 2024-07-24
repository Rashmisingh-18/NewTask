import React, { useState } from 'react';
import KpiCard from './KpiCard';
import './KpiGrid.css';

const KpiGrid = () => {
    const [cards, setCards] = useState([
        {
            title: 'Daily Active Users, India',
            value: '52.5K',
            change: '+2.3%',
            chartData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                    {
                        label: 'Users',
                        data: [50, 51, 52, 53, 54, 55, 56],
                        borderColor: 'rgba(75,192,192,1)',
                        fill: false,
                    },
                ],
            },
        },
        {
            title: 'Daily Active Users, Japan',
            value: '12.5K',
            change: '+1.5%',
            chartData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                    {
                        label: 'Users',
                        data: [10, 11, 12, 13, 14, 15, 16],
                        borderColor: 'rgba(153,102,255,1)',
                        fill: false,
                    },
                ],
            },
        },
    ]);

    return (
        <div className="kpi-grid">
            {cards.map((card, index) => (
                <KpiCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    change={card.change}
                    chartData={card.chartData}
                />
            ))}
        </div>
    );
};

export default KpiGrid;
