import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import noHabitsImage from "../../../assets/no-habits.png";
import DashboardSection from "../../ui/DashboardSection";
import { Link } from "react-router";

export default function NoHabits() {
  const { t } = useTranslation();

  return (
    <DashboardSection className="items-center gap-5 justify-center">
      <img
        src={noHabitsImage}
        alt={t("habits.noHabits.altImage")}
        className="w-28 sm:w-40 object-contain mx-auto opacity-80"
      />
      <h2 className="text-2xl sm:text-3xl font-semibold text-center">
        {t("habits.noHabits.title")}
      </h2>
      <p className="text-sm sm:text-base text-gray-400 text-center max-w-sm">
        {t("habits.noHabits.description")}
      </p>
      <Button
        component={Link}
        to="/habits/create"
        variant="filled"
        size="md"
        radius="md"
      >
        {t("habits.noHabits.createButton")}
      </Button>
    </DashboardSection>
  );
}
