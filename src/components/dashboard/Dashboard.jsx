import { useState } from "react";
import { Pagination } from "@mantine/core";
import HabitSummary from "../habits/habitSummary/HabitSummary";
import DashboardSection from "../ui/DashboardSection";
import NoHabits from "../habits/noHabits/NoHabits";
import AppLoader from "../loader/AppLoader";
import useHabits from "../../hooks/habits/useHabits";
import StatsOverview from "./StatsOverview";

const PAGE_SIZE = 20;

export default function Dashboard() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useHabits({ page, size: PAGE_SIZE });

  if (isLoading) {
    return <AppLoader />;
  }

  const [habitsData, progress] = data;
  const habits = habitsData?.content ?? [];
  const totalPages = habitsData?.page?.totalPages ?? habitsData?.totalPages ?? 1;

  if (habits && habits.length === 0 && page === 0) {
    return <NoHabits />;
  }

  return (
    <DashboardSection>
      <div className="flex flex-col gap-10">
        <StatsOverview />
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-semibold">My habits</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {habits.map((habit) => (
              <HabitSummary
                key={habit.id}
                {...habit}
                weeklyCheckins={progress[habit.id] ?? 0}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                total={totalPages}
                value={page + 1}
                onChange={(p) => setPage(p - 1)}
                withControls
                withEdges
              />
            </div>
          )}
        </div>
      </div>
    </DashboardSection>
  );
}
