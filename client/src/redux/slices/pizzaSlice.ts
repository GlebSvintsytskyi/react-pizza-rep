import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type PizzaItem = {
  id: any;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

type FeatchPizzasArg = {
  categoriesId: number;
  sortId: string;
  currentPage: number;
};

type CreatePizzasArg = {
  file: any;
  title: string;
  price: number;
  sizes: string;
  types: string;
  category: number;
  rating: number;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzasSliceState {
  items: PizzaItem[];
  pizzas: PizzaItem[];
  search: string;
  status: Status;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], FeatchPizzasArg>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { categoriesId, sortId, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `http://localhost:3001/pizza-product?page=${currentPage}&category=${categoriesId}
      &sort=${sortId}`
    );

    return data;
  }
);

export const fetchAllPizzas = createAsyncThunk<PizzaItem[]>(
  "pizza/fetchAllPizzasStatus",
  async () => {
    const { data } = await axios.get<PizzaItem[]>(
      `http://localhost:3001/pizza-product/pizzas`
    );

    return data;
  }
);

export const createPizza = createAsyncThunk<PizzaItem, CreatePizzasArg>(
  "pizza/createPizzaStatus",
  async (params) => {
    const {file, category, title, price, sizes, types, rating} = params;

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("category", category.toString());
    formData.append("title", title);
    formData.append("price", price.toString());
    formData.append("sizes", sizes.toString());
    formData.append("types", types.toString());
    formData.append("rating", rating.toString());
    
    const { data } = await axios.post<PizzaItem>('http://localhost:3001/pizza-product', formData);
    return data;
  }
);

const initialState: PizzasSliceState = {
  items: [],
  pizzas: [],
  search: '',
  status: Status.LOADING
};

export const pizzaSplice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },

    setSearch(state, action) {
      state.search = action.payload;
    },

    setPizzas(state, action) {
      state.pizzas = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    builder.addCase(fetchAllPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });

    builder.addCase(fetchAllPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchAllPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //       state.status = 'loading'
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //       state.items = action.payload;
  //       state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //       state.items = [];
  //       state.status = 'error';
  //   }
  // }
});

export const selectPizza = (state: RootState) => state.pizza;
export const selectPizzaSearch = (state: RootState) => state.pizza.search;

export const { setItems, setSearch } = pizzaSplice.actions;

export default pizzaSplice.reducer;
