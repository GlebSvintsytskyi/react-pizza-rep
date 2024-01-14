import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PaginationSpliceState {
  currentPage: number;
}

const initialState: PaginationSpliceState = {
  currentPage: 1,
};

export const paginationSplice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const selectPaginationPage = (state: RootState) =>
  state.pagination.currentPage;

export const { setCurrentPage } = paginationSplice.actions;

export default paginationSplice.reducer;
