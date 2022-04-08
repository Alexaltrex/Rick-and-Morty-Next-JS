import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

interface CharacterState {
    currentPage: number
}
const initialState: CharacterState = {
    currentPage: 1,
}

export const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
    }
});

export const {setCurrentPage} = characterSlice.actions;

export const selectCurrentPage = (state: RootState) => state.character.currentPage;

export const characterReducer = characterSlice.reducer