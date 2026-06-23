import { configureStore } from "@reduxjs/toolkit";
import { employeeReducer } from "./store/reducer/employeeReducer";
import { authReducer } from "./store/reducer/authReducer";
import { assetReducer } from "./store/reducer/assetReducer";

export const store =  configureStore({
    reducer : {
        employees : employeeReducer,
        user : authReducer,
        asset : assetReducer,
        
    }
})