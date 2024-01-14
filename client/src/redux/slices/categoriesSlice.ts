import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CategoriesSliceState {
  categories: string[];
  categoriesId: number;
}

const initialState: CategoriesSliceState = {
  categories: ["Всі", "Мясні", "Вегетаріанські", "Гриль", "Гострі", "Закриті"],
  categoriesId: 0,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCutegoriesId(state, action: PayloadAction<number>) {
      state.categoriesId = action.payload;
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;
export const selectCategoriesId = (state: RootState) =>
  state.categories.categoriesId;

export const { setCutegoriesId } = categoriesSlice.actions;

export default categoriesSlice.reducer;
