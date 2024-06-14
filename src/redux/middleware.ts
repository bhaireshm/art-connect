/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Middleware,
  Store,
  type AnyAction,
  type Dispatch,
} from "@reduxjs/toolkit";

type MiddlewareFunction = (store: Store) => Middleware<Dispatch<AnyAction>>;

export class DynamicMiddlewares {
  /**
   * By checking whether a given `middleware reducer` or `api` has middleware, then combines all the middlewares and returns
   *
   * @param middlewares
   * @param reducers
   */
  public static combineMiddlewares(middlewares: any, reducers: any) {
    const apiMiddlewares: MiddlewareFunction[] = [];

    if (Array.isArray(middlewares))
      middlewares?.forEach((midlwr) => checkMiddlewareHasMiddleware(midlwr));
    else checkMiddlewareHasMiddleware(middlewares);

    // * Add API to middleware for caching and etc.
    if (Object.keys(reducers).length)
      Object.keys(reducers).forEach((rdcr: string) =>
        checkMiddlewareHasMiddleware(reducers[rdcr]),
      );
    else checkMiddlewareHasMiddleware(reducers);

    // * Check whether the passed middleware is an API
    function checkMiddlewareHasMiddleware(midlwr: any) {
      if (apiMiddlewares.indexOf(midlwr) > -1) return;
      if (midlwr?.middleware && typeof midlwr?.middleware === "function")
        apiMiddlewares.push(midlwr.middleware);
      else if (midlwr?.reducerPath) apiMiddlewares.push(midlwr);
    }

    return apiMiddlewares;
  }
}
