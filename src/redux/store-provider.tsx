"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore as store } from "./store";

export function StoreProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const storeRef = useRef<AppStore>();
  // Create the store instance the first time this renders
  if (!storeRef.current) storeRef.current = store();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
