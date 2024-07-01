import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user-slice";
import presenceReducer from "./features/presence-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      presence: presenceReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];