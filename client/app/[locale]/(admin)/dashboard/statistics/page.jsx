import { getTranslations } from "next-intl/server";
import VisitorsStatistics from "./_VisitorsStatistics";
import StatisticsTable from "./_StatisticsTable";

export default async function StatisticsPage({ params: { locale } }) {
  const t = await getTranslations("Statistics");

  const visitorTranslations = {
    statisticsTxt: t("statistics"),
    todayTxt: t("today"),
    weeklyTxt: t("weekly"),
    monthlyTxt: t("monthly"),
    yearlyTxt: t("yearly"),
    totalVisitorsTxt: t("totalVisitors"),
  };

  const tableTranslations = {
    currentLang: locale,
    quranNameTxt: t("quranName"),
    totalDownloadsTxt: t("totalDownloads"),
  };

  return (
    <div className="relative max-w-screen-xl mx-auto">
      <div className="flex flex-wrap justify-center gap-12 md:justify-evenly ">
        <StatisticsTable {...tableTranslations} />
        <VisitorsStatistics {...visitorTranslations} />
      </div>
    </div>
  );
}
