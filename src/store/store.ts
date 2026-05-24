import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../reducer/Productslice";
import  colorSlice  from "../reducer/Colorslice";
import categorySlice from "../reducer/Categoryslice";
import brandSlice from "../reducer/Brandslice";
import cartslice from "../reducer/Cartslice"
import authSlice from "../reducer/Myaccountslice"
import wishlistSlice  from "../reducer/Wishlistslice";

export const store = configureStore({
    reducer:{
        products:productSlice,
        colors: colorSlice,
        categories: categorySlice,  
        brands: brandSlice,
        cart: cartslice,
        auth:authSlice,
        wishlist:wishlistSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch