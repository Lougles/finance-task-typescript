import { createSlice } from '@reduxjs/toolkit';

interface RootState {
    tickers: {
        actualTickers: string[];
        previousTickers: string[];
        loading: boolean;
        error: boolean;
    };
}
const initialState = {
    actualTickers: [],
    previousTickers: [],
    loading: false,
    error: false,
};

export const tickersSlice = createSlice({
    name: 'tickers',
    initialState,
    reducers: {
        getTickersRequested: (state) => {
            state.loading = true;
            state.error = false;
        },
        getTickersActual: (state, action) => {
            state.actualTickers = action.payload;
            state.loading = false;
            state.error = false;
        },
        getTickersPrevious: (state, action) => {
            state.previousTickers = action.payload;
            state.loading = false;
            state.error = false;
        },
        getTickersError: (state) => {
            state.loading = false;
            state.error = true;
        },
    },
});

export const {
    getTickersRequested,
    getTickersActual,
    getTickersPrevious,
    getTickersError,
} = tickersSlice.actions;

export const selectTickersData = (state: RootState) => state.tickers;

export default tickersSlice.reducer;
