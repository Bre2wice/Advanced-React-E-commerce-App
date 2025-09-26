import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

// Name the store to avoid Fast Refresh issues
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
