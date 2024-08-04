import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import minesReducer from "./reducers/mines";

export default configureStore({
    reducer: {
        products: productsReducer,
        mines: minesReducer,
    },
});
