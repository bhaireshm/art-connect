"use client";

import { useAppSelector, useUser } from "@/redux";
import { COOKIE, ROUTES } from "@/utils/constants";
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
    if (!isAuthenticated && pathName !== ROUTES.LOGIN.path) router.push(ROUTES.LOGIN.path);
    else if (isAuthenticated && pathName === ROUTES.LOGIN.path) router.push(ROUTES.HOME.path);
  }, [isAuthenticated, pathName, router, searchParams]);

  return <>{children}</>;
}
