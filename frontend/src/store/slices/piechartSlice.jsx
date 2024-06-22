import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const fetchPieStats = createAsyncThunk(
    "data/pieChart",
    async (queryParams) => {
        try {
            const response = await axios.get(`${API}/piechart`, { params: queryParams });
            const responseData = response.data.pieChartData;

            const pieData = responseData.map(item => ({
                name: Object.keys(item)[0], // Get the key (name) of the object
                value: item[Object.keys(item)[0]] // Get the value of the key
            }));

            return pieData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

const initialState = {
    isPieLoading: false,
    name: "Pie Chart",
    pieChartData: [],
    isPieError: ""
}

const PiechartSlice = createSlice({
    name: 'stats',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPieStats.pending, (state) => {
                state.isPieLoading = true;
            })
            .addCase(fetchPieStats.fulfilled, (state, action) => {
                state.isPieLoading = false;
                state.pieChartData = action.payload;
            })
            .addCase(fetchPieStats.rejected, (state, action) => {
                state.isPieLoading = false;
                state.isPieError = action.error.message;
            })
    }
})

export default PiechartSlice.reducer;
