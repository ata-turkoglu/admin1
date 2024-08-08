import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://localhost:3000/pomzaexport";

const initialState = {
    products: [],
};

export const productsSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });

        builder.addCase(addEditProduct.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status) {
                delete data.status;
                if (data.add) {
                    delete data.add;
                    state.products.push(data);
                } else {
                    delete data.add;
                    const index = state.products.findIndex(
                        (product) => product.productId == data.productId
                    );
                    state.products[index] = data;
                }
            } else {
                console.log("error", data.error);
                state.saveButtonSpinner = false;
            }
        });

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            const data = action.payload;
            if (data.status) {
                const index = state.products.findIndex(
                    (product) => product.productId == data.productId
                );
                state.products.splice(index, 1);
                state.saveButtonSpinner = false;
            } else {
                console.log("error", data.error);
                state.saveButtonSpinner = false;
            }
        });
    },
});

export const getProducts = createAsyncThunk(
    "/products/get",
    async (productId) => {
        return await axios
            .get(SERVER_URL + "/products", { params: { productId } })
            .then((result) => result.data)
            .catch((e) => console.log("error", e));
    }
);

export const addEditProduct = createAsyncThunk(
    "/products/add",
    async (data) => {
        return await axios
            .post(SERVER_URL + "/products", { data })
            .then((result) => {
                return { ...data, ...result.data, add: !data.productId };
            })
            .catch((e) => console.log("error", e));
    }
);

export const deleteProduct = createAsyncThunk(
    "/products/delete",
    async (productId) => {
        return await axios
            .delete(SERVER_URL + "/products", { params: { productId } })
            .then((result) => result.data)
            .catch((e) => console.log("error", e));
    }
);

export const {} = productsSlice.actions;

export default productsSlice.reducer;
