"use client";

import { useAppSelector, useUser } from "@/redux";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { checkAuthStatus, selectIsAuthenticated } = useUser();
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    const pathName = window.location.pathname;
    if (!isAuthenticated && pathName.startsWith("/private")) router.push("/login");
    else if (isAuthenticated && pathName === "/login") router.push("/");
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
