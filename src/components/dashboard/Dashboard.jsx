import { useState } from "react";
import { Loader, Pagination } from "@mantine/core";
import { useTranslation } from "react-i18next";
import HabitSummary from "../habits/habitSummary/HabitSummary";
import DashboardSection from "../ui/DashboardSection";
import NoHabits from "../habits/noHabits/NoHabits";
import useHabits from "../../hooks/habits/useHabits";
import StatsOverview from "./StatsOverview";

const PAGE_SIZE = 20;

export default function Dashboard() {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const { data, isLoading } = useHabits({ page, size: PAGE_SIZE });

  if (!isLoading && data) {
    const [habitsData] = data;
    const habits = habitsData?.content ?? [];
    if (habits.length === 0 && page === 0) {
      return <NoHabits />;
    }
  }

  const [habitsData, progress] = data ?? [];
  const habits = habitsData?.content ?? [];
  const totalPages =
    habitsData?.page?.totalPages ?? habitsData?.totalPages ?? 1;

  return (
    <DashboardSection>
      <div className="flex flex-col gap-10">
        <StatsOverview />
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-semibold">{t("dashboard.myHabits")}</h2>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </DashboardSection>
  );
}
