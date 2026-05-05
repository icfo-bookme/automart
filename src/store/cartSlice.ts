import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
    barcode: string | null;
    regular_price:  string | null;
    cost_price: string | null;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: typeof window !== "undefined" && localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")!)
        : [],
};

const saveToLocalStorage = (items: CartItem[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(items));
    }
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            
            saveToLocalStorage(state.items);
        },
        increaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
                item.quantity += 1;
                saveToLocalStorage(state.items);
            }
        },
        decreaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== action.payload);
                }
                saveToLocalStorage(state.items);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
            saveToLocalStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveToLocalStorage(state.items);
        },
    },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
