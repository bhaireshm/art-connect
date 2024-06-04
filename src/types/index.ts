import type { ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObj = Record<string, any>;

export interface Props {
  readonly children: ReactNode;
}

export type ReadOnlyProps<T = Props> = Readonly<T & Props>;

export type Params<S extends string> = { params: Record<S, string> };
