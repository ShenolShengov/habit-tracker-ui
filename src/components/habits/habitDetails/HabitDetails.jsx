import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import MonthsCheckIns from "./MonthsCheckIns";
import CheckInsHistory from "./CheckInsHistory";
import HabitStats from "./HabitStats";

export default function HabitDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col gap-6 sm:gap-10 p-4 sm:p-10 lg:p-16 font-outfit">
      <div className="flex flex-col pb-4 gap-4 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {t("habits.details.title")}
        </h1>
      </div>
      <HabitStats />
      <CheckInsHistory habitId={id} />
      <MonthsCheckIns habitId={id} />
    </div>
  );
}
