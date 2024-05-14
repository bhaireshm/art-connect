"use client";

import { Provider } from "react-redux";

import { ACStore } from "@/redux";
import type { Props } from "@/types";

export const StoreProvider = ({ children }: Props) => {
  const ac_store = ACStore.getInstance();
  const store = ac_store.getStore();
  console.log("file: store-provider.tsx:10  StoreProvider  store", ac_store);

  // ac_store.inject(counterSlice);

  return <Provider store={store}>{children}</Provider>;
};
