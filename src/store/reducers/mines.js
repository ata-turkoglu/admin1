import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const SERVER_URL = "http://localhost:3000/pomzaexport";

const initialState = {
    mines: [],
};

export const minesSlice = createSlice({
    name: "mines",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMines.fulfilled, (state, action) => {
            state.mines = action.payload;
        });

        builder.addCase(addEditMine.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status) {
                delete data.status;
                if (data.add) {
                    delete data.add;
                    state.mines.push(data);
                } else {
                    delete data.add;
                    const index = state.mines.findIndex(
                        (mine) => mine.mineId == data.mineId
                    );
                    state.mines[index] = data;
                }
            } else {
                console.log("error", data.error);
                state.saveButtonSpinner = false;
            }
        });

        builder.addCase(deleteMine.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status) {
                const index = state.mines.findIndex(
                    (mine) => mine.mineId == data.mineId
                );
                state.mines.splice(index, 1);
                state.saveButtonSpinner = false;
            } else {
                console.log("error", data.error);
                state.saveButtonSpinner = false;
            }
        });
    },
});

export const getMines = createAsyncThunk("/mines/get", async (mineId) => {
    return await axios
        .get(SERVER_URL + "/mines", { params: { mineId } })
        .then((result) => result.data)
        .catch((e) => console.log("error", e));
});

export const addEditMine = createAsyncThunk("/mines/add", async (data) => {
    return await axios
        .post(SERVER_URL + "/mine", { data })
        .then((result) => {
            return { ...data, ...result.data, add: !data.mineId };
        })
        .catch((e) => console.log("error", e));
});

export const deleteMine = createAsyncThunk("/mines/delete", async (mineId) => {
    return await axios
        .delete(SERVER_URL + "/mine", { params: { mineId } })
        .then((result) => result.data)
        .catch((e) => console.log("error", e));
});

export const {} = minesSlice.actions;

export default minesSlice.reducer;
