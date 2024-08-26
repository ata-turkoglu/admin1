import { configureStore } from "@reduxjs/toolkit";
import mineSlice from "./reducers/mines";
import facilitySlice from "./reducers/facilities";
import productSlice from "./reducers/products";
import mainPageSlice from "./reducers/mainPage";
import aboutPageSlice from "./reducers/about";
import userSlice from "./reducers/user";

export default configureStore({
    reducer: {
        mineSlice,
        facilitySlice,
        productSlice,
        mainPageSlice,
        aboutPageSlice,
        userSlice,
    },
});
