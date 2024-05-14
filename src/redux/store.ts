/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelCase, isDevelopment } from "@/utils";
import {
  combineReducers,
  configureStore,
  createSlice,
  type AnyAction,
  type ConfigureStoreOptions,
  type CreateSliceOptions,
  type PayloadAction,
  type ReducersMapObject,
  type Slice,
  type Store,
} from "@reduxjs/toolkit";
import { setupListeners as RTKQ_SetupListeners } from "@reduxjs/toolkit/query";
import { DynamicMiddlewares } from "./middleware";
import { enableDevTools, rootReducerData } from "./root";

// Old Implementations
// export type RootState = ReturnType<typeof rootReducer>;
// export const store = () =>
//   configureStore({
//     reducer: rootReducer,
//     // middleware: (getDefaultMiddleware) => {
//     //   return getDefaultMiddleware().concat(); // sampleApiSlice.middleware
//     // },
//   });
// // Infer the return type of `makeStore`
// export type AppStore = ReturnType<typeof store>;
// Infer the `AppDispatch` type from the store itself
// export type AppDispatch = AppStore['dispatch'];
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   RootState,
//   unknown,
//   Action
// >;

interface ActionsObject {
  [n: string]: () => void;
}

type CustomObject = { [k: string]: any };
type CreateSliceOptionsMapObject = { [name: string]: CreateSliceOptions };

export interface ACStoreConfigureStoreOptions {
  reducers: CreateSliceOptions | CreateSliceOptionsMapObject;

  middleware?: CreateSliceOptionsMapObject | CreateSliceOptionsMapObject[];

  devTools?: boolean;

  preloadedState?: object;

  enhancers?: []; // TODO: implemention pending
}

type ActionDispatch = PayloadAction<any> | AnyAction;

export class ACStore {
  private static instance: ACStore;

  /** Store's instance variable. */
  private store: Store;

  /** Object whose values correspond to different `reducer` functions. */
  private reducers: ReducersMapObject = {};

  /** Object whose values correspond to different `reducer` function's `dispathced action` methods. */
  private actions: ActionsObject = {};
  private states: CustomObject = {}; // todo: change this later

  /**
   * Configures and creates a store using `configureStore` method.
   *
   * @param args The store configuration.
   */
  constructor(args?: ACStoreConfigureStoreOptions) {
    this.store = configureStore(this.getDefaultConfig(args));

    // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
    // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
    RTKQ_SetupListeners(this.store.dispatch);
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * @param action
   */
  private dispatch(action: ActionDispatch) {
    this.store.dispatch(action);
  }

  /**
   * A function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.\
   * The reducer argument is passed to `createReducer`.
   *
   * @param reducerOptions
   * @returns {Slice}
   */
  private createSlice(reducerOptions: CreateSliceOptions): Slice {
    const slice = createSlice({
      name: reducerOptions.name,
      reducers: reducerOptions.reducers,
      extraReducers: reducerOptions.extraReducers,
      initialState: reducerOptions.initialState ?? {},
    });
    return slice;
  }

  /**
   * This takes all the action methods and adds dispatching functionality for each method and creates a `hook` using reducer name.\
   * Eg. If reducer name is `user` => `useUser()`
   *
   * @param {Slice} slice
   */
  private dispatchActionMethods(slice: Slice) {
    // * Dispatching actions
    const state = slice.getInitialState();
    const { actions } = slice;
    const disptchedMethods: { [actionName: string]: (data: unknown) => void } = { state };

    Object.keys(actions).forEach((action: string) => {
      disptchedMethods[action] = (data: unknown) => this.dispatch(actions[action](data));
    });

    this.actions[`use${camelCase(slice.name.replace(/ /g, ""))}`] = () => disptchedMethods;
  }

  private createSelectorHook(slice: Slice) {
    this.states[`use${camelCase(slice.name.replace(/ /g, ""))}State`] = (state: any) =>
      state[slice.name];
  }

  /**
   * Holds the default values for creating initial `store`,
   * `root` reducer is also injected at instance creation.
   */
  private getDefaultConfig(args?: ACStoreConfigureStoreOptions): ConfigureStoreOptions {
    args = { ...args, reducers: {} };

    const reducer: any = {
      root: rootReducerData(args?.reducers),
      ...args?.reducers,
    };
    Object.keys(reducer).forEach((k) => this.registerReducer(reducer[k]));

    const middlewares: any[] = DynamicMiddlewares.combineMiddlewares(args?.middleware, reducer);

    if (args?.devTools || isDevelopment()) {
      args = { ...args, ...enableDevTools() };
      // todo: check this by adding logger dynamically and test once
      middlewares.push(reduxDefaultlogger);
    }

    // * Generic fetch middleware
    // middlewares.push(fetchApi.middleware);

    return {
      reducer: this.reducers,
      // ...((args?.devTools || isDevelopment()) ?? enableDevTools()),

      // enhancers: args?.enhancers || [],

      // * Adding the api middleware enables caching, invalidation, polling,
      // * and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    };
  }

  /**
   * Adds a new reducer to reducers object, It checks whether the passed object is an API then \
   * if not it creats slice and dispatching all the action methods.
   *
   * @param reducerOption
   * @returns {void}
   */
  private registerReducer(reducerOption: CreateSliceOptions) {
    if (reducerOption.reducerPath) reducerOption.name = reducerOption.reducerPath;
    if (this.reducers[reducerOption.name]) {
      console.error(`'${reducerOption.name}' reducer exists.`);
      return;
    }
    // console.warn(`Reducer not found for '${reducerOption.name}', creating new slice`);

    // * Create
    const slice = this.createSlice(reducerOption);
    this.reducers = { ...this.reducers, [reducerOption.name]: slice.reducer };

    // * On register of new reducer, check the dispatched action methods.
    this.dispatchActionMethods(slice);

    // * Create state hooks for the slice.
    this.createSelectorHook(slice);
  }

  /**
   * If instance is created returns the same instance or creates one and returns same.
   *
   * @returns {ACStore}
   */
  public static getInstance(): ACStore {
    if (!ACStore.instance) ACStore.instance = new ACStore();
    return ACStore.instance;
  }

  /**
   * A store is an object that holds the application's state tree. There should only be a single store in a Redux app, as the composition happens on the reducer level.
   *
   * @returns {Store}
   *
   * @example
   * ```js
   * const store = ACStore.getStore();
   * ```
   */
  public getStore(): Store {
    return this.store;
  }

  /**
   * This creates method for each slices.
   * If reducer name is `sample` => created hook `useSample()`.
   *
   * @note No need to dispatch any action methods, internally dispatches when it is called.
   * @returns {ActionsObject}
   *
   * @example
   * ```js
   * const { useSample } = ACStore.getActions(); // returns all the hooks.
   * const { updateData } = useSample(); // returns all the dispatched action methods.
   *
   * const data = { id: SID233, title: "some new title." };
   * updateData(data);
   * ```
   */
  public getActions(): ActionsObject {
    return this.actions;
  }

  /**
   * Returns all the reducers which holds the dispatched action methods.
   *
   * @returns {ReducersMapObject}
   *
   * @example
   * ```js
   * const allReducers = ACStore.getReducers();
   * ```
   */
  public getReducers(): ReducersMapObject {
    return this.reducers;
  }

  /**
   * Adds a new reducer to existing redux store.
   * @note API's middleware are added to middleware automatically, only if it is passed at the time of `store` creation.
   *
   * @param reducerOptions
   *
   * @example
   * ```js
   * const sampleReducer = {
   *  name: "sample",
   *  initialState: { data: [{ id: SID231, title: "Some title..." }] },
   *  reducers: {
   *    updateData: (state: any, payload: any) => {
   *      state.data = payload.payload;
   *    },
   *  },
   * };
   *
   * // * Inject new reducer to store.
   * ACStore.inject(sampleReducer);
   * // or
   * ACStore.inject([sampleReducer, anotherReducer]);
   * ```
   * @returns {ACStore}
   */
  public inject(reducerOptions: CreateSliceOptions | CreateSliceOptions[]) {
    if (Array.isArray(reducerOptions)) reducerOptions.forEach(this.registerReducer);
    else this.registerReducer(reducerOptions);

    this.store.replaceReducer(combineReducers(this.reducers));
    return this;
  }
}

export const ac_store = ACStore.getInstance();

function reduxDefaultlogger(): (
  next: APF_Dispatch<APF_AnyAction>,
) => (action: APF_Action) => APF_AnyAction {
  return (next) => (action) => {
    const { type } = action;

    const ignore = ["/subscriptionsUpdated", "/middlewareRegistered"]; // "/removeQueryResult"
    if (ignore.some((i) => type.endsWith(i))) return next(action);

    let date: string | Date = new Date();
    date = `${date.toLocaleTimeString(window?.navigator?.language || "en-US", { hourCycle: "h24" })}.${date.getMilliseconds()}`;

    console.group(
      `%c action '%c${type}' - %c${date}`,
      "font:normal normal normal;",
      "font:oblique small-caps bold;",
      "font:oblique small-caps bold;",
    );
    console.log("%c new state", "color: #4CAF50;", action);
    console.groupEnd();

    return next(action);
  };
}
