import {
  combineReducers,
  configureStore,
  type Reducer,
} from "@reduxjs/toolkit";
import { rootReducerData } from "./root";

const reducers = combineReducers({ rootReducerData });

export const store = () => configureStore({ reducer: reducers });

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
  Object.keys(reducer).forEach((reducerName) => {
    store().replaceReducer(reducer[reducerName]);
  });
}
