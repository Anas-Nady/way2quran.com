"use client";
import React, { useState, useEffect } from "react";
import VisitorStat from "./_VisitorStat";

const VisitorsStatistics = ({
  statisticsTxt,
  weeklyTxt,
  monthlyTxt,
  yearlyTxt,
  totalVisitorsTxt,
}) => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [weeklyVisitors, setWeeklyVisitors] = useState(0);
  const [monthlyVisitors, setMonthlyVisitors] = useState(0);
  const [yearlyVisitors, setYearlyVisitors] = useState(0);

  const fetchVisitorCount = async (range) => {
    try {
      const response = await fetch(`/api/visitors/count/${range}`, {
        next: { revalidate: 0 },
      });

      if (response.ok) {
        const data = await response.json();
        switch (range) {
          case "weekly":
            setWeeklyVisitors(data.visitorCount);
            break;
          case "monthly":
            setMonthlyVisitors(data.visitorCount);
            break;
          case "yearly":
            setYearlyVisitors(data.visitorCount);
            break;
          case "total":
            setTotalVisitors(data.visitorCount);
            break;
          default:
            console.warn("Unknown range:", range);
            break;
        }
      } else {
        console.error("Failed to fetch visitor count:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching visitor count:", error);
    }
  };

  useEffect(() => {
    const fetchAllVisitorCounts = async () => {
      await Promise.all([
        fetchVisitorCount("total"),
        fetchVisitorCount("weekly"),
        fetchVisitorCount("monthly"),
        fetchVisitorCount("yearly"),
      ]);
    };

    fetchAllVisitorCounts();
  }, []);

  return (
    <div>
      <h2 className="my-5 text-lg font-semibold border-b-2 border-green-500 dark:border-green-500 sm:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl">
        {statisticsTxt}
      </h2>
      <div>
        <VisitorStat label={weeklyTxt} count={weeklyVisitors} />
        <VisitorStat label={monthlyTxt} count={monthlyVisitors} />
        <VisitorStat label={yearlyTxt} count={yearlyVisitors} />
        <VisitorStat label={totalVisitorsTxt} count={totalVisitors} />
      </div>
    </div>
  );
};

export default VisitorsStatistics;
