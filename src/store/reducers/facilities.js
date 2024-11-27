import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//const SERVER_URL = "http://localhost:3000/pomzaexport";

const initialState = {
    facilities: [],
};

export const facilitySlice = createSlice({
    name: "facilities",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFacilities.fulfilled, (state, action) => {
            if (action.payload) state.facilities = action.payload;
        });

        builder.addCase(addEditFacility.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status) {
                //delete data.status;
                if (data.add) {
                    delete data.add;
                    state.facilities.push(data);
                } else {
                    delete data.add;
                    const index = state.facilities.findIndex(
                        (facility) => facility.facilityId == data.facilityId
                    );
                    state.facilities[index] = data;
                }
            } else {
                console.log("error", data.error);
                state.saveButtonSpinner = false;
            }
        });

        builder.addCase(deleteFacility.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status) {
                const index = state.facilities.findIndex(
                    (facility) => facility.facilityId == data.facilityId
                );
                state.facilities.splice(index, 1);
                state.saveButtonSpinner = false;
            } else {
                console.log("error", data.error);
                state.saveButtonSpinner = false;
            }
        });
    },
});

export const getFacilities = createAsyncThunk(
    "/facilities/get",
    async (facilityId) => {
        return await axios
            .get("/facilities", { params: { facilityId } })
            .then((result) => {
                if (result.status == 200) {
                    return result.data;
                } else {
                    return result.response.data;
                }
            })
            .catch((e) => console.log("error", e));
    }
);

export const addEditFacility = createAsyncThunk(
    "/facilities/add",
    async (data) => {
        return await axios
            .post("/facilities", { data })
            .then((result) => {
                return { ...data, ...result.data, add: !data.facilityId };
            })
            .catch((e) => console.log("error", e));
    }
);

export const deleteFacility = createAsyncThunk(
    "/facilities/delete",
    async (facilityId) => {
        return await axios
            .delete("/facilities", { params: { facilityId } })
            .then((result) => result.data)
            .catch((e) => console.log("error", e));
    }
);

export const {} = facilitySlice.actions;

export default facilitySlice.reducer;
