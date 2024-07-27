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

// Create a generic type for the selector hook object
type SelectorHookObject<T extends { [key: string]: any }> = {
  [K in keyof T]: () => ReturnType<T[K]>;
};

function dispatchActionMethods<T extends { [key: string]: any }>(slice: Slice) {
  // * Dispatching actions
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const store = useAppStore();
  const state = slice.getInitialState();
  const actions = slice.actions;
  const dispatchedMethods: { [actionName: string]: (data: unknown) => PayloadAction<keyof T> } = { state };

  Object.keys(actions).forEach((action: string) => {
    dispatchedMethods[action] = (data: unknown) => store.dispatch(actions[action](data));
  });

  return dispatchedMethods as ActionHookObject<T>;
}

function useSelectorMethods<T extends { [key: string]: any }>(slice: Slice) {
  const selectors = (slice as any).selectors;
  const selectorMethods: { [selectorName: string]: () => any } = {};

  Object.keys(selectors).forEach((selector: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // selectorMethods[selector] = useAppSelector(selectors[selector]);
    selectorMethods[selector] = selectors[selector];
  });

  return selectorMethods as SelectorHookObject<T>;
}

export function useSliceMethods<T extends { [key: string]: any }>(slice: Slice) {
  const actionMethods = dispatchActionMethods<T>(slice);
  const selectorMethods = useSelectorMethods<T>(slice);

  return {
    ...actionMethods,
    ...selectorMethods,
  };
}