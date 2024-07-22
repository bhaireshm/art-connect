import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../create-slice";
import { createActionHook } from "../hooks";

interface User {
  email: string;
  username: string;
  id: string;
}

export interface UserSliceState {
  token: string | null;
  user: User | null;
}

const initialState: UserSliceState = {
  token: null,
  user: null,
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create: any) => ({
    // Set user information and token
    setUser: create?.reducer((state: UserSliceState, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    }),

    // Update user information
    updateUserInfo: create?.reducer((state: UserSliceState, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }),

    // Logout
    logout: create?.reducer((state: UserSliceState) => {
      state.token = null;
      state.user = null;
    }),
  }),
  selectors: {
    selectToken: (state: UserSliceState) => state.token,
    selectUser: (state: UserSliceState) => state.user,
  },
});

// Create the action hook function
export const useUser = () => createActionHook<typeof userSlice.actions>(userSlice)
