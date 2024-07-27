"use client";

import { useAppSelector, useUser } from "@/redux";
import { COOKIE } from "@/utils/constants";
import { parse } from "cookie";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function PrivatePagesLayout({ children }: AuthProviderProps) {
  const { checkAuthStatus, selectIsAuthenticated, setUser } = useUser();
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    const cookies = parse(COOKIE.name);
    if (cookies[COOKIE.name]) {
      const userToken = cookies[COOKIE.name];
      setUser(userToken);
    }
  }, [setUser]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    const pathName = window.location.pathname;
    if (!isAuthenticated) router.push("/login");
    else if (isAuthenticated && pathName === "/login") router.push("/");
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
