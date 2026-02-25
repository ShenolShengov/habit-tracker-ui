import {
  IconFlame,
  IconChecks,
  IconTrendingUp,
  IconCalendarCheck,
} from "@tabler/icons-react";
import { Skeleton } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { useTranslation } from "react-i18next";
import useOverview from "../../hooks/stats/useOverview";
import useWeeklySummary from "../../hooks/stats/useWeeklySummary";
import useBestStreak from "../../hooks/stats/useBestStreak";

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 sm:p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
      <div className="p-2.5 sm:p-3 bg-blue-50 rounded-xl text-blue-600">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-400">{label}</p>
        <p className="text-xl sm:text-2xl font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}

export default function StatsOverview() {
  const { t } = useTranslation();
  const { data: overview, isLoading: overviewLoading } = useOverview();
  const { data: weekly, isLoading: weeklyLoading } = useWeeklySummary();
  const { data: bestStreak, isLoading: bestStreakLoading } = useBestStreak();

  const isLoading = overviewLoading || weeklyLoading || bestStreakLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={80} radius="lg" />
          ))}
        </div>
        <Skeleton height={200} radius="lg" />
      </div>
    );
  }

  const checkInsLabel = t("dashboard.checkIns");
  const chartData =
    weekly?.dailyCheckIns?.map((entry) => ({
      day: entry.day,
      [checkInsLabel]: entry.count,
    })) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">{t("dashboard.overview")}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<IconChecks size={22} />}
          label={t("dashboard.totalCheckIns")}
          value={overview?.totalCheckIns ?? 0}
        />
        <StatCard
          icon={<IconFlame size={22} />}
          label={t("dashboard.activeStreaks")}
          value={overview?.activeStreaks ?? 0}
        />
        <StatCard
          icon={<IconTrendingUp size={22} />}
          label={t("dashboard.bestStreak")}
          value={`${bestStreak?.days ?? 0} ${t("dashboard.days")}`}
        />
        <StatCard
          icon={<IconCalendarCheck size={22} />}
          label={t("dashboard.completedToday")}
          value={`${weekly?.completeToday ?? 0} / ${weekly?.totalHabits ?? 0}`}
        />
      </div>
      {chartData.length > 0 && (
        <div className="border border-gray-100 rounded-xl p-4 sm:p-6">
          <h3 className="text-base font-semibold text-gray-700 mb-4">{t("dashboard.thisWeek")}</h3>
          <BarChart
            h={200}
            data={chartData}
            dataKey="day"
            series={[{ name: checkInsLabel, color: "blue.6" }]}
            tickLine="y"
          />
        </div>
      )}
    </div>
  );
}
