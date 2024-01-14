import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartsFromLS } from "../../utils/getCartsFromLS";
import { calcTotalPrice } from "../../utils/calcFullprice";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  type: string;
  size: number;
  imageUrl: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const { items, totalPrice } = getCartsFromLS();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      if (!findItem?.count) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCarts = (state: RootState) => state.carts;
export const selectCartById = (id: number) => (state: RootState) =>
  state.carts.items.find((obj: CartItem) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } =
  cartsSlice.actions;

export default cartsSlice.reducer;
