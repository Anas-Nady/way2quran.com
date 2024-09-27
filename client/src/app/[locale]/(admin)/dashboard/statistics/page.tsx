import VisitorsStatistics from "./_VisitorsStatistics";
import StatisticsTable from "./_StatisticsTable";
import React from "react";
import { PageParams } from "@/types/types";

const StatisticsPage: React.FC<PageParams> = ({ params: { locale } }) => {
  return (
    <div className="relative max-w-screen-xl mx-auto">
      <div className="flex flex-wrap justify-center gap-12 md:justify-evenly ">
        <StatisticsTable locale={locale} />
        <VisitorsStatistics />
      </div>
    </div>
  );
};

export default StatisticsPage;
