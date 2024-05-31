import { configureStore, type Reducer } from "@reduxjs/toolkit";

export const store = () =>
  configureStore({
    reducer: {},
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

type ReducerType = {
  [name: string]: Reducer;
};

/**
 * TODO
 * Refer the below link and implement the whole reducer injection
 * @link https://redux.js.org/usage/code-splitting#defining-an-injectreducer-function
 */
export function addReducer(reducer: ReducerType) {
  // ReducerType[]
  Object.keys(reducer).forEach((reducerName) => {
    store().replaceReducer(reducer[reducerName]);
  });
}
