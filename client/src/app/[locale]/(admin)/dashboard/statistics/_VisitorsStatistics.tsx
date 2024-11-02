"use client";
import React, { useState, useEffect } from "react";
import VisitorStat from "./_VisitorStat";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import ToastMessage from "@/components/ui/ToastMessage";

type VisitorsStats = {
  [key: string]: number;
};

const VisitorsStatistics = () => {
  const t = useTranslations("Statistics");

  const translate = {
    statistics: t("statistics"),
    today: t("today"),
    weekly: t("weekly"),
    monthly: t("monthly"),
    yearly: t("yearly"),
    totalVisitors: t("totalVisitors"),
  };

  const [visitorStats, setVisitorStats] = useState<VisitorsStats>({
    totalVisitors: 0,
    todayVisitors: 0,
    weeklyVisitors: 0,
    monthlyVisitors: 0,
    yearlyVisitors: 0,
  });
  const [restartState, setRestartState] = useState({
    loading: false,
  });

  const fetchVisitorCounts = async () => {
    try {
      const response = await fetch(`/api/visitors/count`, {
        next: { revalidate: 0 },
      });

      if (response.ok) {
        const data = await response.json();
        setVisitorStats({
          totalVisitors: data.total,
          todayVisitors: data.today,
          weeklyVisitors: data.weekly,
          monthlyVisitors: data.monthly,
          yearlyVisitors: data.yearly,
        });
      } else {
        console.error("Failed to fetch visitor counts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching visitor counts:", error);
    }
  };

  useEffect(() => {
    fetchVisitorCounts();
  }, []);

  const handleRestartServer = async () => {
    setRestartState({ loading: true });
    try {
      await fetch("/api/restart-server", {
        method: "POST",
      });
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setRestartState({
        loading: false,
      });
    }
  };

  return (
    <div>
      <h2 className="my-5 text-lg font-semibold border-b-2 border-green-500 dark:border-green-500 sm:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl">
        {translate.statistics}
      </h2>
      <div>
        <VisitorStat
          label={translate.today}
          count={visitorStats.todayVisitors}
        />
        <VisitorStat
          label={translate.weekly}
          count={visitorStats.weeklyVisitors}
        />
        <VisitorStat
          label={translate.monthly}
          count={visitorStats.monthlyVisitors}
        />
        <VisitorStat
          label={translate.yearly}
          count={visitorStats.yearlyVisitors}
        />
        <VisitorStat
          label={translate.totalVisitors}
          count={visitorStats.totalVisitors}
        />
      </div>
      <Button
        type="button"
        isLoading={restartState.loading}
        onClick={handleRestartServer}
      >
        {t("restartServer")}
      </Button>
    </div>
  );
};

export default VisitorsStatistics;
