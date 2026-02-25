import { BarChart } from "@mantine/charts";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export default function MonthsCheckIns({ checkIns, viewedYear }) {
  const { t } = useTranslation();
  const checkInsLabel = t("habits.details.checkInsChartLabel");

  const yearInfo = () => {
    const yearStats = [...checkIns].reduce((acc, c) => {
      const month = dayjs(c).format("MMM");
      acc[month] = (acc[month] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(yearStats).map(([month, count]) => {
      return { month, [checkInsLabel]: count };
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl sm:text-2xl font-semibold">
        {t("habits.details.checkInsByMonth", { year: viewedYear })}
      </h2>
      <div className="border border-gray-100 rounded-xl p-4 sm:p-6">
        <BarChart
          h={300}
          data={yearInfo()}
          dataKey="month"
          series={[{ name: checkInsLabel, color: "blue.6" }]}
          tickLine="y"
        />
      </div>
    </div>
  );
}
