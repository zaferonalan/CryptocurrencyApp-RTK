import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from"./cryptoSlice"

export const reducer = configureStore({
    reducer:{
        crypto: cryptoReducer,
    },
})