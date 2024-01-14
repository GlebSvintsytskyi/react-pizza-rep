import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type User = {
  email: string;
  password: string;
};

type LoginArg = {
  email: string;
  password: string;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface UserSliceState {
  user: boolean;
  status: Status;
};

export const login = createAsyncThunk<User, LoginArg>(
  "user/userStatus",
  async (params) => {
    const {email, password} = params;
    const { data } = await axios.post<User>('http://localhost:3001/auth/login', {
        email,
        password
    });
    console.log(data)
    return data;
  }
);

const initialState: UserSliceState = {
  user: false,
  status: Status.LOADING
};

export const userSplice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
        state.status = Status.LOADING;
        state.user = false;
      });

      builder.addCase(login.fulfilled, (state, action) => {
        state.user = true;
        state.status = Status.SUCCESS;
      });

      builder.addCase(login.rejected, (state) => {
        state.status = Status.ERROR;
        state.user = false;
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

export const selectUser = (state: RootState) => state.user;

export const { setUser } = userSplice.actions;

export default userSplice.reducer;
