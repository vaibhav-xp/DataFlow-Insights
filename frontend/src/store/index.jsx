import { configureStore } from '@reduxjs/toolkit';
import transactionSlice from './slices/transactionSlice';
import statsSlice from './slices/statsSlice';
import barStatsSlice from './slices/barchartSlice';
import PiechartSlice from './slices/piechartSlice'

const store = configureStore({
    reducer: {
        transactions: transactionSlice,
        stats: statsSlice,
        barchart: barStatsSlice,
        piechart: PiechartSlice
    }
});

export default store;
