import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// Create a generic type for the action hook object
type ActionHookObject<T extends { [key: string]: any }> = {
  [K in keyof T]: (payload?: Parameters<T[K]>[1]) => void;
};

export function createActionHook<T extends { [key: string]: any }>(slice: any) {
  const actionHooks: { [key: string]: (payload?: any) => void } = {};
  for (const actionName in slice.actions) {
    if (Object.hasOwn(slice.actions, actionName)) {
      actionHooks[actionName] = (payload?: any) => {
        const dispatch = useAppDispatch();
        return () => dispatch(slice.actions[actionName](payload));
      };
    }
  }
  return actionHooks as ActionHookObject<T>;
}