import { useTranslations } from "next-intl";
import {
  audioIcon,
  chartLineIcon,
  messagesIcon,
  settingsIcon,
  userIcon,
  usersIcon,
} from "@/components/Icons";
import DashboardAsideBar from "./_components/DashboardAsideBar";
import AdminAuthenticationLayout from "./_components/AdminAuthenticationLayout";

export const metadata = {
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

export default function DashboardLayout({ children, params: { locale } }) {
  const t = useTranslations("DashboardLinks");

  const dashboardLinks = [
    {
      name: t("statistics"),
      icon: chartLineIcon,
      url: "statistics",
    },
    {
      name: t("addReciter"),
      icon: userIcon,
      url: "add-reciter",
    },
    {
      name: t("allReciters"),
      icon: usersIcon,
      url: "all-reciters",
    },
    {
      name: t("uploadRecitation"),
      icon: audioIcon,
      url: "upload-recitation",
    },
    {
      name: t("messages"),
      icon: messagesIcon,
      url: "messages",
    },
    {
      name: t("settings"),
      icon: settingsIcon,
      url: "profile",
    },
  ];

  return (
    <AdminAuthenticationLayout>
      <div className="flex min-h-screen my-2 dark:bg-gray-900 bg-slate-50">
        <DashboardAsideBar
          currentLang={locale}
          dashboardLinks={dashboardLinks}
          logoutTxt={t("logout")}
        />
        <div className="container p-6 text-gray-900 dark:bg-gray-800 dark:text-slate-300 bg-slate-100">
          {children}
        </div>
      </div>
    </AdminAuthenticationLayout>
  );
}
