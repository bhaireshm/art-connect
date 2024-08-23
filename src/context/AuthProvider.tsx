"use client";

import type { User } from "@/types";
import { ROUTES, SCHEMA_NAMES } from "@/utils/constants";
import { isEmpty } from "@bhaireshm/ez.js";
import { Group, Loader } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

const PrivatePagesLayoutContext = createContext<{
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  updateUserInfo: (userInfo: Partial<User>) => void;
  logout: () => void;
  checkAuthStatus: () => void;
} | null>(null);

export function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const IGNORED_PATHS = [
    ROUTES.LOGIN.path,
    ROUTES.FORGOT_PASSWORD.path,
    ROUTES.RESET_PASSWORD.path,
  ];

  const checkAuthStatus = () => {
    const storedUser = localStorage.getItem(SCHEMA_NAMES.USER);
    if (!isEmpty(storedUser)) {
      const parsedUser = JSON.parse(storedUser!);
      setUser(parsedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Check if the current path is in the ignored paths list
    if (!isAuthenticated && !IGNORED_PATHS.includes(pathName)) router.push(ROUTES.LOGIN.path);
    else if (isAuthenticated && IGNORED_PATHS.includes(pathName)) router.push(ROUTES.HOME.path);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, pathName, router, isLoading]);

  const setUserAndAuthenticate = (newUser: User) => {
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem(SCHEMA_NAMES.USER, JSON.stringify(newUser));
  };

  const updateUserInfo = (userInfo: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userInfo };
      setUserAndAuthenticate(updatedUser);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(SCHEMA_NAMES.USER);
    router.push(ROUTES.LOGIN.path);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      setUser: setUserAndAuthenticate,
      updateUserInfo,
      logout,
      checkAuthStatus,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, user]
  );

  if (isLoading)
    return (
      <Group justify="center" my="lg">
        <Loader />
      </Group>
    );

  return (
    <PrivatePagesLayoutContext.Provider value={value}>
      {children}
    </PrivatePagesLayoutContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(PrivatePagesLayoutContext);
  if (!context) throw new Error("useAuthContext must be used within a AuthProvider");
  return context;
}
