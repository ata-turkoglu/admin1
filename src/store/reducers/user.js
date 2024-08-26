import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: { status: false },
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status) {
                state.user.status = data.status;
                axios.defaults.headers.Authorization = "Bearer " + data.token;
            } else {
                console.log("error", data.error);
            }
        });
    },
});

export const login = createAsyncThunk("/login", async (data) => {
    return await axios
        .post("/login", { data })
        .then((result) => result.data)
        .catch((e) => console.log("error", e));
});

export const {} = userSlice.actions;

export default userSlice.reducer;
