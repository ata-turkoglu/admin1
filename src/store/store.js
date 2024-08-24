import { configureStore } from "@reduxjs/toolkit";
import mineSlice from "./reducers/mines";
import facilitySlice from "./reducers/facilities";
import productSlice from "./reducers/products";
import mainPageSlice from "./reducers/mainPage";

export default configureStore({
    reducer: {
        mineSlice,
        facilitySlice,
        productSlice,
        mainPageSlice,
    },
});
