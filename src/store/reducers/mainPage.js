import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://localhost:3000/pomzaexport";

const initialState = {
    mainPageData: null,
};

export const mainPageSlice = createSlice({
    name: "mainPage",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMainPageData.fulfilled, (state, action) => {
            state.mainPageData = action.payload;
        });

        builder.addCase(saveMainPageData.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status) {
            } else {
                console.log("error", data.error);
                state.saveButtonSpinner = false;
            }
        });
    },
});

export const getMainPageData = createAsyncThunk("/mainPage/get", async () => {
    return await axios
        .get(SERVER_URL + "/website/mainPage")
        .then((result) => result.data)
        .catch((e) => console.log("error", e));
});

export const saveMainPageData = createAsyncThunk(
    "/mainPage/save",
    async (data) => {
        return await axios
            .post(SERVER_URL + "/website/mainPage", { data })
            .then((result) => {
                console.log("saveMainPageData", result);
                return data;
            })
            .catch((e) => console.log("error", e));
    }
);

export const {} = mainPageSlice.actions;

export default mainPageSlice.reducer;
