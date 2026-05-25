import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../api/Productapi";

interface IProduct {
    id: number;
    productName: string;
    price: number;
    image: string;
    hasDiscount: boolean;
    discountPrice: number;
    rating: number;
    categoryName: string;
}

interface IProductState {
    products: IProduct[];
    loading: boolean;
    error: string | null;
    initialized: boolean;
}

const initialState: IProductState = {
    products: [],
    loading: false,
    error: null,
    initialized: false,
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload?.data ?? action.payload ?? [];
                state.initialized = true;
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch products";
            });
    },
});

export const { actions: productActions } = productSlice;
export default productSlice.reducer;