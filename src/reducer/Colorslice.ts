import { createSlice } from "@reduxjs/toolkit";
import { getColors, type IColor } from "../api/Colorapi";

interface ColorState {
    colors: IColor[];
    loading: boolean;
    error: string | null;
}

const initialState: ColorState = {
    colors: [],
    loading: false,
    error: null,
};

export const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getColors.fulfilled, (state, action) => {
                state.loading = false;
                state.colors = action.payload;
            })

            .addCase(getColors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default colorSlice.reducer;