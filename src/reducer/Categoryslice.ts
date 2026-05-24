// store/categorySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../api/categoryapi";

interface Category {
  id: number;
  categoryName: string;
  categoryImage: string | null;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
      .addCase(getCategories.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "Failed"; });
  },
});

export default categorySlice.reducer;