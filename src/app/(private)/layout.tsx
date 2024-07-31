"use client";

import { useAppSelector, useUser } from "@/redux";
import { COOKIE } from "@/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function PrivatePagesLayout({ children }: Readonly<AuthProviderProps>) {
  const { checkAuthStatus, selectIsAuthenticated, setUser } = useUser();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem(COOKIE.name);
    if (token) {
      checkAuthStatus();
      setUser(JSON.parse(token));
    }
  }, [checkAuthStatus, setUser]);

  useEffect(() => {
    if (!isAuthenticated && pathName !== "/login") router.push("/login");
    else if (isAuthenticated && pathName === "/login") router.push("/");
  }, [isAuthenticated, pathName, router, searchParams]);

  return <>{children}</>;
}
