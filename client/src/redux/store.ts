import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import categoriesSlice from './slices/categoriesSlice';
import filtersSplice from './slices/filtersSplice';
import paginationSplice from './slices/paginationSplice';
import cartsSlice from './slices/cartsSlice';
import pizzaSlice from './slices/pizzaSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    filters: filtersSplice,
    pagination: paginationSplice,
    carts: cartsSlice,
    pizza: pizzaSlice,
    user: userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();