import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API;


// Create an async thunk to fetch transaction data with query parameters
export const fetchTransactionData = createAsyncThunk(
    'data/list',
    async (queryParams) => {
        try {
            const response = await axios.get(`${API}/list`, { params: queryParams });
            return response.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
);

const initialState = {
    isLoading: true,
    transactionData: [],
    isError: null,
    search: '',
    month: '',
    pageInfo: {},
};

const transactionDataSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        searchText(state, action) {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTransactionData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactionData = action.payload.transactions;
                state.pageInfo = action.payload.pageInfo;
            })
            .addCase(fetchTransactionData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            });
    }
});

export const { searchText } = transactionDataSlice.actions;
export default transactionDataSlice.reducer;
