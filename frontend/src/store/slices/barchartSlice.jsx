import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const fetchBarData = createAsyncThunk(
    "data/barChart",
    async (queryParams) => {
        try {
            const response = await axios.get(`${API}/barChart`, { params: queryParams });
            const responseData = response.data.barChartData.map((data) => ({
                name: data.range,
                uv: data.count
            }));
            return responseData;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
)

const initialState = {
    isBarLoading: true,
    barChartData: {},
    isBarError: null,
};

const barStatsSlice = createSlice({
    name: 'stats',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBarData.pending, (state) => {
                state.isBarLoading = true;
            })
            .addCase(fetchBarData.fulfilled, (state, action) => {
                state.isBarLoading = false;
                state.barChartData = action.payload;
            })
            .addCase(fetchBarData.rejected, (state, action) => {
                state.isBarLoading = false;
                state.isError = action.error.message;
            });
    }
});
export default barStatsSlice.reducer;
