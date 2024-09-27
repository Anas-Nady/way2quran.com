import {
  audioIcon,
  chartLineIcon,
  messagesIcon,
  settingsIcon,
  userIcon,
  usersIcon,
} from "@/components/Icons";
import { useTranslations } from "next-intl";

const DASHBOARD_LINKS = () => {
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
  return dashboardLinks;
};

export default DASHBOARD_LINKS;
