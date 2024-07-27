import type { User } from "@/types";
import { SCHEMA_NAMES } from "@/utils/constants";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../create-slice";
import { useSliceMethods } from "../hooks";

interface UserSliceState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: UserSliceState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

export const userSlice = createAppSlice({
  name: SCHEMA_NAMES.USER.toLowerCase(),
  initialState,
  reducers: (create: any) => ({
    setUser: create?.reducer((state: UserSliceState, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    }),

    updateUserInfo: create?.reducer((state: UserSliceState, action: PayloadAction<Partial<User>>) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    }),

    logout: create?.reducer((state: UserSliceState) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    }),

    checkAuthStatus: create?.reducer((state: UserSliceState) => {
      state.isAuthenticated = !!state.token;
    }),
  }),
  selectors: {
    selectToken: (state: UserSliceState) => state.token,
    selectUser: (state: UserSliceState) => state.user,
    selectIsAuthenticated: (state: UserSliceState) => state.isAuthenticated,
  },
});

export const useUser = () => useSliceMethods<typeof userSlice.actions & typeof userSlice.selectors>(userSlice);
