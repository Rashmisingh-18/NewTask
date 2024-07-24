import React from 'react';
import KpiCard from './KpiCard';
import { Container, Grid } from '@mui/material';

function App() {
  return (
    <Container>
      <h1>KPI Cards</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <KpiCard
            title="Baer Limited"
            ticker="BAL"
            price="$49.33"
            change="-9.85"
            changePercent="-1.9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KpiCard
            title="QuantData Holding"
            ticker="QDH"
            price="$129.10"
            change="+12.10"
            changePercent="+7.1"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KpiCard
            title="Not Normal, Inc."
            ticker="NNO"
            price="$89.80"
            change="+7.50"
            changePercent="+1.2"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
