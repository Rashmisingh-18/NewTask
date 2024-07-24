// src/components/KpiGrid.js
import React, { useEffect, useState } from 'react';
import KpiCard from './KpiCard';
import { getMetrics, getSegments } from '../Api';
import './KpiGrid.css';

const KpiGrid = () => {
    const [metrics, setMetrics] = useState([]);
    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetricsAndSegments = async () => {
            try {
                const fetchedMetrics = await getMetrics();
                console.log('Fetched Metrics:', fetchedMetrics); // Debug log
                const fetchedSegments = await getSegments();
                console.log('Fetched Segments:', fetchedSegments); // Debug log

                // Verify data structure before setting state
                if (Array.isArray(fetchedMetrics) && Array.isArray(fetchedSegments)) {
                    setMetrics(fetchedMetrics);
                    setSegments(fetchedSegments);
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchMetricsAndSegments();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log('Metrics State:', metrics); // Debug log
    console.log('Segments State:', segments); // Debug log

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
