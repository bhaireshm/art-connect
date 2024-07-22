import type { Slice } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// Create a generic type for the action hook object
type ActionHookObject<T extends { [key: string]: any }> = {
  [K in keyof T]: (payload?: Parameters<T[K]>[1]) => void;
};

export function dispatchActionMethods<T extends { [key: string]: any }>(slice: Slice) {
  // * Dispatching actions
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const store = useAppStore();
  const state = slice.getInitialState();
  const actions = slice.actions;
  const disptchedMethods: { [actionName: string]: (data: unknown) => void } = { state };

  Object.keys(actions).forEach((action: string) => {
    disptchedMethods[action] = (data: unknown) => store.dispatch(actions[action](data));
  });

  // actions[`use${camelCase(slice.name.replace(/ /g, ""))}`] = () => disptchedMethods;
  // console.log("file: hooks.ts:43  disptchedMethods", disptchedMethods);
  return disptchedMethods as ActionHookObject<T>;
}
