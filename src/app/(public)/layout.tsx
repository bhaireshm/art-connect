"use client";

import { useUser } from "@/redux";
import { COOKIE } from "@/utils/constants";
import { parse } from "cookie";
import { useEffect } from "react";

export default function PublicPagesLayout({ children }: { children: React.ReactNode }) {
  const { setUser } = useUser();

  useEffect(() => {
    const cookies = parse(COOKIE.name);
    if (cookies[COOKIE.name]) {
      const userToken = cookies[COOKIE.name];
      setUser(userToken);
    }
  }, [setUser]);

  return <>{children}</>;
}
