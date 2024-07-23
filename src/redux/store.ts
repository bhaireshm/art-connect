import { configureStore } from '@reduxjs/toolkit';
import { rootReducerData } from "./root";
import { userSlice } from "./slices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // rootReducerData,
      [userSlice.name]: userSlice.reducer,
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];