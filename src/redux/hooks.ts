import type { PayloadAction, Slice } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// Create a generic type for the action hook object
type ActionHookObject<T extends { [key: string]: any }> = {
  [K in keyof T]: (payload?: Parameters<T[K]>[1]) => PayloadAction<T[K]>;
};

export function dispatchActionMethods<T extends { [key: string]: any }>(slice: Slice) {
  // * Dispatching actions
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const store = useAppStore();
  const state = slice.getInitialState();
  const actions = slice.actions;
  const disptchedMethods: { [actionName: string]: (data: unknown) => PayloadAction<keyof T> } = { state };

  Object.keys(actions).forEach((action: string) => {
    disptchedMethods[action] = (data: unknown) => store.dispatch(actions[action](data));
  });

  return disptchedMethods as ActionHookObject<T>;
}
