import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//const SERVER_URL = "http://localhost:3000/pomzaexport";

const initialState = {
    aboutText: null,
};

export const aboutSlice = createSlice({
    name: "about",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAboutText.fulfilled, (state, action) => {
            if (action.payload) state.aboutText = action.payload;
        });

        builder.addCase(saveAboutText.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status) {
                state.aboutText = JSON.parse(data.data);
            } else {
                console.log("error", data.error);
                return false;
            }
        });
    },
});

export const getAboutText = createAsyncThunk("/about/get", async () => {
    return await axios
        .get("/website/about")
        .then((result) => {
            if (result.status == 200) {
                return result.data;
            } else {
                return result.response.data;
            }
        })
        .catch((e) => console.log("error", e));
});

export const saveAboutText = createAsyncThunk("/about/save", async (data) => {
    return await axios
        .post("/website/about", { data })
        .then((result) => {
            if (result.status) {
                return { status: true, data };
            } else {
                return false;
            }
        })
        .catch((e) => console.log("error", e));
});

export const {} = aboutSlice.actions;

export default aboutSlice.reducer;
