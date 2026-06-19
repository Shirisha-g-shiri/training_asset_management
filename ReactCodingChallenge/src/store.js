import { configureStore } from "@reduxjs/toolkit";
import { listReducer } from "./store/reducer/listReducer";

export const store =  configureStore({
    reducer : {
        list : listReducer,
    }
})