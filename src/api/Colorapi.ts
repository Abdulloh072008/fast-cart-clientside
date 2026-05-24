import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/token";

export interface IColor {
    id: number
    colorName?: string;
}

export const getColors = createAsyncThunk(
    "color/getColors",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosRequest.get("/api/Color/get-colors")
            return data?.data?.color as IColor[];
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);