"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    router.push(`${pathName}/add-reciter`);
  }, []);

  return (
    <div className="container p-6 dark:bg-gray-800 text-gray-900 dark:text-slate-300 bg-slate-100"></div>
  );
}
