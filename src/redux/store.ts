import { configureStore } from "@reduxjs/toolkit";
import uiManagerReducer from "./ui-managment";

const store=configureStore({
    reducer:{
        uiManagerReducer
    }
})



export default store;

export type RootState =ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;