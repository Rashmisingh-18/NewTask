import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const KpiCard = ({ title, ticker, price, change, changePercent }) => {
    const isPositive = parseFloat(changePercent) >= 0;

    return (
        <Card sx={{ minWidth: 275, margin: 2, padding: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title} ({ticker})
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                    {price}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {isPositive ? (
                        <ArrowDropUpIcon color="success" />
                    ) : (
                        <ArrowDropDownIcon color="error" />
                    )}
                    <Typography
                        variant="body2"
                        color={isPositive ? 'green' : 'red'}
                        sx={{ ml: 0.5 }}
                    >
                        {change} ({changePercent}%)
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default KpiCard;
