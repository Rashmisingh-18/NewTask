import React from 'react';
import KpiCard from './KpiCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>KPI Cards</h1>
      <div className="kpi-container">
        <KpiCard
          title="Baer Limited"
          ticker="BAL"
          price="$49.33"
          change="-9.85"
          changePercent="-1.9"
        />
        <KpiCard
          title="QuantData Holding"
          ticker="QDH"
          price="$129.10"
          change="+12.10"
          changePercent="+7.1"
        />
        <KpiCard
          title="Not Normal, Inc."
          ticker="NNO"
          price="$89.80"
          change="+7.50"
          changePercent="+1.2"
        />
      </div>
    </div>
  );
}

export default App;
