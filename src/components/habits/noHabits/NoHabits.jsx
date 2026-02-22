import { Button } from "@mantine/core";
import noHabitsImage from "../../../assets/no-habits.png";
import DashboardSection from "../../ui/DashboardSection";
import { Link } from "react-router";

export default function NoHabits() {
  return (
    <DashboardSection className="items-center gap-5 justify-center">
      <img
        src={noHabitsImage}
        alt="No habits yet"
        className="w-28 sm:w-40 object-contain mx-auto opacity-80"
      />
      <h2 className="text-2xl sm:text-3xl font-semibold text-center">
        No habits yet
      </h2>
      <p className="text-sm sm:text-base text-gray-400 text-center max-w-sm">
        Create your first habit to start tracking your progress
      </p>
      <Button
        component={Link}
        to="/habits/create"
        variant="filled"
        size="md"
        radius="md"
      >
        Create habit
      </Button>
    </DashboardSection>
  );
}
