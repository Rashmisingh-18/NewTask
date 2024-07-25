// src/components/KpiCard.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getSnapshot } from '../Api';
import './KpiCard.css';

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const KpiCard = ({ metrics, segments, metric, segmentKey, segmentId, onAddCard, onSave, onDelete, isEditMode: initialEditMode, onCardClick }) => {
    const [data, setData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(initialEditMode);
    const [selectedMetric, setSelectedMetric] = useState(metric);
    const [selectedSegmentGroup, setSelectedSegmentGroup] = useState(segmentKey);
    const [selectedSegment, setSelectedSegment] = useState(segmentId);

    useEffect(() => {
        if (!isEditMode && selectedMetric && selectedSegmentGroup && selectedSegment) {
            const fetchData = async () => {
                const result = await getSnapshot(selectedMetric, selectedSegmentGroup, selectedSegment);
                setData(result);
            };
            fetchData();
        }
    }, [isEditMode, selectedMetric, selectedSegmentGroup, selectedSegment]);

    const handleSave = () => {
        setIsEditMode(false);
        onSave(selectedMetric, selectedSegmentGroup, selectedSegment);
    };

    const handleSegmentGroupChange = (e) => {
        setSelectedSegmentGroup(e.target.value);
        setSelectedSegment('');
    };

    const handleSegmentChange = (e) => {
        setSelectedSegment(e.target.value);
    };

    return (
        <div
            className={`kpi-card ${isEditMode ? 'edit-mode' : 'view-mode'}`}
            onClick={() => {
                if (!isEditMode) {
                    onCardClick();
                }
            }}
        >
            {isEditMode ? (
                <>
                    <div>
                        <label>
                            Metric:
                            <select
                                value={selectedMetric}
                                onChange={(e) => setSelectedMetric(e.target.value)}
                            >
                                {metrics.map((metric) => (
                                    <option key={metric.id} value={metric.id}>
                                        {metric.displayName}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Segment Group:
                            <select
                                value={selectedSegmentGroup}
                                onChange={handleSegmentGroupChange}
                            >
                                {segments.map((segmentGroup) => (
                                    <option key={segmentGroup.segmentKey} value={segmentGroup.segmentKey}>
                                        {segmentGroup.displayName}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    {selectedSegmentGroup && (
                        <div>
                            <label>
                                Segment:
                                <select
                                    value={selectedSegment}
                                    onChange={handleSegmentChange}
                                >
                                    {segments.find(sg => sg.segmentKey === selectedSegmentGroup)?.values.map((segment) => (
                                        <option key={segment.segmentId} value={segment.segmentId}>
                                            {segment.displayName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}
                    <button onClick={handleSave}>Save</button>
                    <button className="add-card left" onClick={() => onAddCard('left')}>+</button>
                    <button className="add-card right" onClick={() => onAddCard('right')}>+</button>
                    <button className="delete-card" onClick={() => onDelete()}>🗑️</button>
                </>
            ) : (
                <>
                    <h3>{selectedMetric}, {selectedSegmentGroup}, {selectedSegment}</h3>
                    {data ? (
                        <>
                            <div className="kpi-value">{data.values[data.values.length - 1].value}</div>
                            <div className="kpi-change">+2.3%</div>
                            <div className="kpi-chart">
                                <Line data={{
                                    labels: data.values.map((item) => item.date),
                                    datasets: [{
                                        label: 'Value',
                                        data: data.values.map((item) => item.value),
                                        borderColor: 'rgba(75,192,192,1)',
                                        fill: false,
                                    }]
                                }} options={{ maintainAspectRatio: false }} />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                    <button className="edit-card" onClick={() => setIsEditMode(true)}>Edit</button>
                    <button className="add-card left" onClick={(e) => { e.stopPropagation(); onAddCard('left'); }}>+</button>
                    <button className="add-card right" onClick={(e) => { e.stopPropagation(); onAddCard('right'); }}>+</button>
                    <button className="delete-card" onClick={() => onDelete()}>🗑️</button>
                </>
            )}
        </div>
    );
};

export default KpiCard;
