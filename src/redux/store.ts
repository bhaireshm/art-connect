import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices";

export const makeStore = () => configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  }
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];