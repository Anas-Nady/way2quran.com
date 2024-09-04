"use client";
import React, { useState, useEffect } from "react";
import VisitorStat from "./_VisitorStat";

const VisitorsStatistics = ({
  statisticsTxt,
  todayTxt,
  weeklyTxt,
  monthlyTxt,
  yearlyTxt,
  totalVisitorsTxt,
}) => {
  const [visitorStats, setVisitorStats] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    weeklyVisitors: 0,
    monthlyVisitors: 0,
    yearlyVisitors: 0,
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

  return (
    <div>
      <h2 className="my-5 text-lg font-semibold border-b-2 border-green-500 dark:border-green-500 sm:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl">
        {statisticsTxt}
      </h2>
      <div>
        <VisitorStat label={todayTxt} count={visitorStats.todayVisitors} />
        <VisitorStat label={weeklyTxt} count={visitorStats.weeklyVisitors} />
        <VisitorStat label={monthlyTxt} count={visitorStats.monthlyVisitors} />
        <VisitorStat label={yearlyTxt} count={visitorStats.yearlyVisitors} />
        <VisitorStat
          label={totalVisitorsTxt}
          count={visitorStats.totalVisitors}
        />
      </div>
    </div>
  );
};

export default VisitorsStatistics;
