import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/token";



export const getCategories = createAsyncThunk(
    "category/getCategories",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosRequest.get("/api/Category/get-categories")
            console.log("API data:", data);        // ← is this printing?
      console.log("returning:", data?.data);
            return data?.data ?? []  
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);