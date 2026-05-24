import { createSlice } from "@reduxjs/toolkit";
import { getBrands } from "../api/Brandapi";

interface Brand {
    id: number;
    brandName: string;
}

interface BrandState {
    brands: Brand[];
    loading: boolean;
    error: string | null;
}

const initialState: BrandState = {
    brands: [],
    loading: false,
    error: null,
};

const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default brandSlice.reducer;