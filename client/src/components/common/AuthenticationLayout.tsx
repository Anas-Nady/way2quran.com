"use client";

import { getUserProfile } from "@/actions/user";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "@/app/[locale]/loading";
import { LocaleProps } from "@/types/types";

type AuthMode = "admin" | "user";

type AuthenticationLayoutProps = LocaleProps & {
  mode: AuthMode;
  children: React.ReactNode;
};

export default function AuthenticationLayout({
  children,
  mode,
  locale,
}: AuthenticationLayoutProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const data = await getUserProfile();
      setIsAdmin(data?.user?.isAdmin);
    } catch (error) {
      console.error(error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (mode === "admin" && !isAdmin) {
    return redirect(`/${locale}/login`);
  }

  if (mode === "user" && isAdmin) {
    return redirect(`/${locale}/dashboard/statistics`);
  }

  return children;
}
