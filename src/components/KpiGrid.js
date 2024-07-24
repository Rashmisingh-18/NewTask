// src/components/KpiGrid.js
import React, { useEffect, useState } from 'react';
import KpiCard from './KpiCard';
import { getMetrics, getSegments } from '../Api';
import './KpiGrid.css';

const KpiGrid = () => {
    const [metrics, setMetrics] = useState([]);
    const [segments, setSegments] = useState([]);

    useEffect(() => {
        const fetchMetricsAndSegments = async () => {
            const fetchedMetrics = await getMetrics();
            const fetchedSegments = await getSegments();
            setMetrics(fetchedMetrics);
            setSegments(fetchedSegments);
        };
        fetchMetricsAndSegments();
    }, []);

    return (
        <div className="kpi-grid">
            {metrics.map((metric) => (
                segments.map((segment) =>
                    segment.values.map((value) => (
                        <KpiCard
                            key={`${metric.id}-${segment.segmentKey}-${value.segmentId}`}
                            metric={metric.id}
                            segmentKey={segment.segmentKey}
                            segmentId={value.segmentId}
                        />
                    ))
                )
            ))}
        </div>
    );
};

export default KpiGrid;
