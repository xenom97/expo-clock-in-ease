import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id: number;
  name: string;
  email: string;
  device_model: string;
  role: string;
  created_at: string;
}

export interface UserState {
  user: null | IUser;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  setUser,
  unsetUser
} = userSlice.actions;

export default userSlice.reducer;