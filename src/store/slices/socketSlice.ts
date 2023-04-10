import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SocketData } from "../types";

export interface SocketState {
    data: SocketData[];
    previousData: SocketData[];
    isLoading: boolean;
    error: boolean;
}

const initialState: SocketState = {
    data: [],
    previousData: [],
    isLoading: true,
    error: false,
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setData(state, action: PayloadAction<SocketData[]>) {
            state.previousData = state.data;
            state.data = action.payload;
            state.isLoading = false;
            state.error = false;
        },
        setLoading(state) {
            state.isLoading = true;
        },
        setError(state) {
            state.error = true;
            state.isLoading = false;
        },
    },
});

export const { setData, setLoading, setError } = socketSlice.actions;
export default socketSlice.reducer;
