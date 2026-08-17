import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeType= "dark" | "light"

type initialStateType ={sideBarShow:boolean,theme:ThemeType}

const initialState:initialStateType={sideBarShow:false,theme:"light"}

const uiManagerSlice = createSlice({

    name:"ui-manager",

    initialState,

    reducers:{

        SetSideBarShow:(state:initialStateType,action:PayloadAction<boolean>)=>{
            state.sideBarShow=action.payload
        },
        ToggleTheme:(state:initialStateType)=>{
            state.theme= state.theme=== "light"? "dark" : "light";
        }
    }
})



const uiManagerReducer=uiManagerSlice.reducer;


export default uiManagerReducer;

export const {SetSideBarShow,ToggleTheme}=uiManagerSlice.actions;