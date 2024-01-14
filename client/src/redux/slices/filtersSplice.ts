import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FiltersSpliceState {
  filters: string[];
  sortId: string;
}

const initialState: FiltersSpliceState = {
  filters: ["rating", "price", "title"],
  sortId: "rating",
};

export const filtersSplice = createSlice({
  name: "folters",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<string>) {
      state.sortId = action.payload;
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;
export const selectSort = (state: RootState) => state.filters.sortId;

export const { setSort } = filtersSplice.actions;

export default filtersSplice.reducer;
