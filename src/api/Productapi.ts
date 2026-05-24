import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/token";

interface IProductParams {
  categoryId?: string | number;
  subCategoryId?: string | number;
  colorIds?: number[];
  brandIds?: number[];
  minPrice?: number;
  maxPrice?: number;
}

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({
    categoryId,
    subCategoryId,
    colorIds,
    brandIds,
    minPrice,
    maxPrice,
  }: IProductParams = {}) => {
    try {
      const params = new URLSearchParams();
      params.append("PageNumber", "1");
      params.append("PageSize", "20");

      if (categoryId !== undefined && categoryId !== null && categoryId !== "") {
        if (Array.isArray(categoryId)) {
          categoryId.forEach((id) => params.append("CategoryId", String(id)));
        } else {
          params.append("CategoryId", String(categoryId));
        }
      }
      if (subCategoryId !== undefined && subCategoryId !== null && subCategoryId !== "") {
        if (Array.isArray(subCategoryId)) {
          subCategoryId.forEach((id) => params.append("SubcategoryId", String(id)));
        } else {
          params.append("SubcategoryId", String(subCategoryId));
        }
      }
      if (brandIds && brandIds.length > 0) {
        brandIds.forEach((id) => params.append("BrandId", String(id)));
      }
      if (colorIds && colorIds.length > 0) {
        colorIds.forEach((id) => params.append("ColorId", String(id)));
      }
      if (minPrice !== undefined) {
        params.append("MinPrice", String(minPrice));
      }
      if (maxPrice !== undefined) {
        params.append("MaxPrice", String(maxPrice));
      }

      const { data } = await axiosRequest.get(
        `/api/Product/get-products?${params.toString()}`
      );

      return data?.data?.products;
    } catch (error) {
      console.error("getProducts error:", error);
      throw error;
    }
  }
);