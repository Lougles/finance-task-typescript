import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from "redux-thunk";



const store = configureStore({
    reducer: {

    },
    middleware: [thunkMiddleware],
    devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch