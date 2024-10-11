"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard({ params: { locale } }: PageParams) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/${locale}/dashboard/statistics`);
  }, [router, locale]);

  return (
    <div className="container p-6 text-gray-900 dark:bg-gray-800 dark:text-slate-300 bg-slate-100"></div>
  );
}
