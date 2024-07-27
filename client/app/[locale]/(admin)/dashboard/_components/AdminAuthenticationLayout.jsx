"use client";

import { getUserProfile } from "@/actions/user";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminAuthenticationLayout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminStatus = async () => {
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

  useEffect(() => {
    checkAdminStatus();
  }, []);

  if (!isAdmin && !isLoading) {
    return redirect("/ar/login");
  }

  if (isAdmin && !isLoading) return <>{children}</>;
}
