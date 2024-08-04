import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mines: [],
};

export const minesSlice = createSlice({
    name: "mines",
    initialState: initialState,
    reducers: {
        getMines: (state, action) => {
            state.mines = action.payload;
        },
    },
});

export const { getMines } = minesSlice.actions;

export default minesSlice.reducer;
