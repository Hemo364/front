import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeType= "dark" | "light"

type initialStateType ={sideBarShow:boolean,theme:ThemeType}

const initialState:initialStateType={sideBarShow:false,theme:localStorage.getItem("theme") as ThemeType || "light"}

const uiManagerSlice = createSlice({

    name:"ui-manager",

    initialState,

    reducers:{

        SetSideBarShow:(state:initialStateType,action:PayloadAction<boolean>)=>{
            state.sideBarShow=action.payload
        },
        ToggleTheme:(state:initialStateType)=>{
            const newTheme=state.theme=== "light"? "dark" : "light";
            localStorage.setItem("theme",newTheme)
            state.theme= newTheme;
        }
    }
})



const uiManagerReducer=uiManagerSlice.reducer;


export default uiManagerReducer;

export const {SetSideBarShow,ToggleTheme}=uiManagerSlice.actions;