import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from "redux-thunk";
import tickersSlice from './slices/tickerSlice'


export const store = configureStore({
    reducer: {
        tickers: tickersSlice,
    },
    middleware: [thunkMiddleware],
    devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch