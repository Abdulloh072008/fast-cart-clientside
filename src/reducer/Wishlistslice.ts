import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
    id: string;
    productName: string;
    price: number;
    discountPrice?: number;
    hasDiscount: boolean;
    image: string;
}

interface WishlistState {
    items: WishlistItem[];
}

const initialState: WishlistState = {
    items: JSON.parse(localStorage.getItem("wishlist") || "[]"),
};

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const exists = state.items.find((item) => item.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem("wishlist", JSON.stringify(state.items));

        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.items));
        },

        clearWishlist: (state) => {
            state.items = [];
            localStorage.setItem("wishlist", JSON.stringify(state.items));
        },
    },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;