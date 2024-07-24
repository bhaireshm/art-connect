import type { User } from "@/types";
import { SCHEMA_NAMES } from "@/utils/constants";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../create-slice";
import { dispatchActionMethods } from "../hooks";

interface UserSliceState {
  token: string | null;
  user: User | null;
}

const initialState: UserSliceState = {
  token: null,
  user: null,
};

export const userSlice = createAppSlice({
  name: SCHEMA_NAMES.USER.toLowerCase(),
  initialState,
  reducers: (create: any) => ({
    // Set user information and token
    setUser: create?.reducer((state: UserSliceState, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    }),

    // Update user information
    updateUserInfo: create?.reducer((state: UserSliceState, action: PayloadAction<Partial<User>>) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    }),

    // Logout
    logout: create?.reducer((state: UserSliceState) => {
      state.token = null;
      state.user = null;
    }),

    isLogin: create?.reducer((state: UserSliceState) => {
      if (state?.token) return true;
      return false;
    }),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUserInfo: create?.reducer((state: UserSliceState, action: PayloadAction<string>) => ({ ...state }))
  }),
  selectors: {
    selectToken: (state: UserSliceState) => state.token,
    selectUser: (state: UserSliceState) => state.user,
    selectUserInfo: (state: UserSliceState) => state,
  },
});

export const useUser = () => dispatchActionMethods<typeof userSlice.actions>(userSlice);
