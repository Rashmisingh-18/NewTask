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
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchMetricsAndSegments = async () => {
            try {
                const fetchedMetrics = await getMetrics();
                const fetchedSegments = await getSegments();

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

    const addCard = (position, index) => {
        const newCard = { id: cards.length + 1, metric: '', segmentKey: '', segmentId: null, isEditMode: true };
        const newCards = [...cards];
        if (position === 'left') {
            newCards.splice(index, 0, newCard);
        } else {
            newCards.splice(index + 1, 0, newCard);
        }
        setCards(newCards);
    };

    const addNewCardAtTop = () => {
        const newCard = { id: cards.length + 1, metric: '', segmentKey: '', segmentId: null, isEditMode: true };
        setCards([newCard, ...cards]);
    };

    const saveCard = (metric, segmentKey, segmentId, index) => {
        const newCards = [...cards];
        newCards[index] = { ...newCards[index], metric, segmentKey, segmentId, isEditMode: false };
        setCards(newCards);
    };

    const deleteCard = (index) => {
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
    };

    const handleCardClick = () => {
        const newCards = cards.map(card => ({
            ...card,
            isEditMode: false
        }));
        setCards(newCards);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="kpi-grid-container">
            <button className="add-card-button" onClick={addNewCardAtTop}>Add New Card</button>
            <div className="kpi-grid">
                {cards.map((card, index) => (
                    <KpiCard
                        key={card.id}
                        metrics={metrics}
                        segments={segments}
                        metric={card.metric}
                        segmentKey={card.segmentKey}
                        segmentId={card.segmentId}
                        isEditMode={card.isEditMode}
                        onAddCard={(position) => addCard(position, index)}
                        onSave={(metric, segmentKey, segmentId) => saveCard(metric, segmentKey, segmentId, index)}
                        onDelete={() => deleteCard(index)}
                        onCardClick={handleCardClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default KpiGrid;
