import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchProfile, saveProfile, type UserProfile } from "../api/Myaccountapi";
import { getToken, saveToken } from "../utils/token";



interface AuthState {
  token: string | null;
  profile: UserProfile | null;
  loading: boolean;
}

const initialState: AuthState = {
  token: getToken(),
  profile: localStorage.getItem("userProfile")
    ? JSON.parse(localStorage.getItem("userProfile")!)
    : null,
  loading: !!getToken() && !localStorage.getItem("userProfile"), 
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; profile: UserProfile }>
    ) {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
      saveToken(action.payload.token);
      localStorage.setItem("userProfile", JSON.stringify(action.payload.profile));
    },
    logout(state) {
      state.token = null;
      state.profile = null;
      localStorage.removeItem("store_token");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem("userProfile", JSON.stringify(action.payload));
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem("userProfile", JSON.stringify(action.payload));
      })
      .addCase(saveProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;