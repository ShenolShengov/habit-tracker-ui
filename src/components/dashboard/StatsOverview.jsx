import {
  IconFlame,
  IconChecks,
  IconTrendingUp,
  IconCalendarCheck,
} from "@tabler/icons-react";
import { Skeleton } from "@mantine/core";
import { BarChart } from "@mantine/charts";
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

  const chartData =
    weekly?.dailyCheckIns?.map((entry) => ({
      day: entry.day,
      "Check-ins": entry.count,
    })) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<IconChecks size={22} />}
          label="Total check-ins"
          value={overview?.totalCheckIns ?? 0}
        />
        <StatCard
          icon={<IconFlame size={22} />}
          label="Active streaks"
          value={overview?.activeStreaks ?? 0}
        />
        <StatCard
          icon={<IconTrendingUp size={22} />}
          label="Best streak"
          value={`${bestStreak?.days ?? 0} days`}
        />
        <StatCard
          icon={<IconCalendarCheck size={22} />}
          label="Completed today"
          value={`${weekly?.completeToday ?? 0} / ${weekly?.totalHabits ?? 0}`}
        />
      </div>
      {chartData.length > 0 && (
        <div className="border border-gray-100 rounded-xl p-4 sm:p-6">
          <h3 className="text-base font-semibold text-gray-700 mb-4">This week</h3>
          <BarChart
            h={200}
            data={chartData}
            dataKey="day"
            series={[{ name: "Check-ins", color: "blue.6" }]}
            tickLine="y"
          />
        </div>
      )}
    </div>
  );
}
