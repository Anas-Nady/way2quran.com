"use client";

import { getUserProfile } from "@/actions/user";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function IsAuthenticated({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathName = usePathname();

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const data = await getUserProfile();
      setIsAdmin(data?.user?.isAdmin);
    } catch (error) {
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const extractLangFromUrl = pathName.split("/");
  const currentLang = extractLangFromUrl[1];

  useEffect(() => {
    isLoggedIn();
  }, []);

  if (isAdmin && !isLoading) {
    return redirect(`/${currentLang}/dashboard/add-reciter`);
  }

  if (!isAdmin && !isLoading) return <>{children}</>;
}
