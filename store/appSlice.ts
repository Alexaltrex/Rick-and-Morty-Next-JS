// Define a type for the slice state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

interface AppState {
    showBurgerMenu: boolean,
    routeChanging: boolean
}

// Define the initial state using that type
const initialState: AppState = {
    showBurgerMenu: false,
    routeChanging: false,
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setShowBurgerMenu: (state, action: PayloadAction<boolean>) => {
            state.showBurgerMenu = action.payload
        },
        setRouteChanging: (state, action: PayloadAction<boolean>) => {
            state.routeChanging = action.payload
        },
    }
})

export const {setShowBurgerMenu, setRouteChanging} = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectShowBurgerMenu = (state: RootState) => state.app.showBurgerMenu;
export const selectRouteChanging = (state: RootState) => state.app.routeChanging;

export const appReducer = appSlice.reducer