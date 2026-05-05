import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WishlistItem = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    barcode: string | null;
    regular_price: string | null;
    cost_price: string | null;
};

type WishlistState = {
    items: WishlistItem[];
};

const initialState: WishlistState = {
    items:
        typeof window !== "undefined" && localStorage.getItem("wishlist")
            ? JSON.parse(localStorage.getItem("wishlist")!)
            : [],
};

const saveToLocalStorage = (items: WishlistItem[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(items));
    }
};

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const exists = state.items.find(i => i.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
                saveToLocalStorage(state.items);
            }
        },

        

        removeFromWishlist: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
            saveToLocalStorage(state.items);
        },

        clearWishlist: (state) => {
            state.items = [];
            saveToLocalStorage(state.items);
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
