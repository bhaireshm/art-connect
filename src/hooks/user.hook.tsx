"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { User } from "@/types";
import { COOKIE } from "@/utils/constants";

interface UserContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setUser: (token: string, user: User) => void;
  updateUserInfo: (userInfo: Partial<User>) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedData = localStorage.getItem(COOKIE.name);
    return storedData ? JSON.parse(storedData).token : null;
  });

  const [userState, setUserState] = useState<User | null>(() => {
    const storedData = localStorage.getItem(COOKIE.name);
    return storedData ? JSON.parse(storedData).user : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuthStatus();
  }, [token]);

  const setUser = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUserState(newUser);
    setIsAuthenticated(true);
    localStorage.setItem(COOKIE.name, JSON.stringify({ token: newToken, user: newUser }));
  };

  const updateUserInfo = (userInfo: Partial<User>) => {
    if (userState) {
      const updatedUser = { ...userState, ...userInfo };
      setUserState(updatedUser);
      localStorage.setItem(COOKIE.name, JSON.stringify({ token, user: updatedUser }));
    }
  };

  const logout = () => {
    setToken(null);
    setUserState(null);
    setIsAuthenticated(false);
    localStorage.removeItem(COOKIE.name);
  };

  const checkAuthStatus = () => {
    setIsAuthenticated(!!token);
  };

  const value = useMemo(
    () => ({
      token,
      user: userState,
      isAuthenticated,
      setUser,
      updateUserInfo,
      logout,
      checkAuthStatus,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, userState, isAuthenticated]
  );

  return <UserContext.Provider value={value}> {children} </UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("useUser must be used within a UserProvider");

  return context;
};
