import { configureStore } from "@reduxjs/toolkit";
import apiSlice from './slices/apiSlice'

export const store = configureStore({
    reducer: {apiSlice}
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

