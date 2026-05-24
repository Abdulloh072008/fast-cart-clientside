import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/token";

export const getBrands = createAsyncThunk(
    "brand/getBrands",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosRequest.get("/api/Brand/get-brands");
            console.log("brands response:", data.data);
            return data?.data?.brands ?? [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);