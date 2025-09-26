import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];

const initialState = {
  items: savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateCount: (state, action) => {
      const { id, count } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.count = count;
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addItem, removeItem, updateCount, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
