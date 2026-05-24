import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/token";

export interface UserProfile {
    userId: number;
    userName: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    phoneNumber: string | null;
    dob: string | null;
    image: string | null;
    userRoles: { id: number; name: string }[];
}

export const fetchProfile = createAsyncThunk(
    "auth/fetchProfile",
    async (userId: number, { rejectWithValue }) => {
        try {
            const res = await axiosRequest.get(
                `/api/UserProfile/get-user-profile-by-id?id=${userId}`
            );
            return res.data.data as UserProfile;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message ?? "Failed to fetch profile");
        }
    }
);

export const saveProfile = createAsyncThunk(
    "auth/saveProfile",
    async (values: Partial<UserProfile> & { userId: number }, { rejectWithValue }) => {
        try {
            const res = await axiosRequest.put(
                "/api/UserProfile/update-user-profile",
                values
            );
            return res.data.data as UserProfile;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message ?? "Failed to save profile");
        }
    }
);