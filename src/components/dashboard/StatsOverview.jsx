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
    <div className="flex items-center gap-4 p-5 border border-gray-100 rounded-md">
      <div className="p-3 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
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
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={80} radius="md" />
          ))}
        </div>
        <Skeleton height={200} radius="md" />
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
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={<IconChecks size={24} />}
          label="Total check-ins"
          value={overview?.totalCheckIns ?? 0}
        />
        <StatCard
          icon={<IconFlame size={24} />}
          label="Active streaks"
          value={overview?.activeStreaks ?? 0}
        />
        <StatCard
          icon={<IconTrendingUp size={24} />}
          label="Best streak"
          value={`${bestStreak?.days ?? 0} days`}
        />
        <StatCard
          icon={<IconCalendarCheck size={24} />}
          label="Completed today"
          value={`${weekly?.habitsCompletedToday ?? 0} / ${weekly?.totalHabits ?? 0}`}
        />
      </div>
      {chartData.length > 0 && (
        <div className="border border-gray-100 rounded-md p-5">
          <h3 className="text-lg font-medium mb-4">This week</h3>
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
