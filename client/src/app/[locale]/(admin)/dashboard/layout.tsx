import React from "react";
import AuthenticationLayout from "@/components/common/AuthenticationLayout";
import DashboardAsideBar from "./_components/DashboardAsideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

interface DashboardLayoutProps extends PageParams {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  params: { locale },
}) => {
  return (
    <AuthenticationLayout mode="admin" locale={locale}>
      <div className="flex min-h-screen my-2 dark:bg-gray-900 bg-slate-50">
        <DashboardAsideBar locale={locale} />
        <div className="container p-6 text-gray-900 dark:bg-gray-800 dark:text-slate-300 bg-slate-100">
          {children}
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default DashboardLayout;
