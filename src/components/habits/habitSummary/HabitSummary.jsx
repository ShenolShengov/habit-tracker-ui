import {
  IconCircleDashedCheck,
  IconCircleDashedPlus,
  IconEdit,
  IconEye,
  IconFlame,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import useDeleteHabit from "../../../hooks/habits/useDeleteHabit";
import useCheckIn from "../../../hooks/checkIn/useCheckIn";
import { notifications } from "@mantine/notifications";

function ActionButtons({ id }) {
  const { t } = useTranslation();
  const { mutateAsync: deleteHabitMutation, isPending: isDeleteLoading } =
    useDeleteHabit();

  const handleDelete = async () => {
    if (confirm(t("habits.summary.deleteConfirm"))) {
      await deleteHabitMutation(id);
      notifications.show({
        title: t("habits.summary.deleteNotificationTitle"),
        message: t("habits.summary.deleteNotificationMessage"),
        color: "red",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        to={`/habits/edit/${id}`}
        className="grow basis-0 min-w-[80px] border py-2 rounded-lg border-gray-200 flex items-center justify-center gap-1.5 no-underline text-inherit text-sm hover:bg-gray-50 transition-all duration-200"
      >
        <IconEdit size={15} stroke={1.5} />
        <span>{t("common.edit")}</span>
      </Link>
      <Button
        onClick={handleDelete}
        loading={isDeleteLoading}
        color="red"
        variant="filled"
        radius="md"
        size="compact-md"
        leftSection={<IconTrash size={15} stroke={1.5} />}
        className="grow basis-0 min-w-[80px]"
      >
        {t("common.delete")}
      </Button>
      <Link
        to={`/habits/details/${id}`}
        className="grow basis-0 min-w-[80px] border py-2 rounded-lg border-gray-200 flex items-center justify-center gap-1.5 no-underline text-inherit text-sm hover:bg-gray-50 transition-all duration-200"
      >
        <IconEye size={15} stroke={1.5} />
        <span>{t("common.details")}</span>
      </Link>
    </div>
  );
}

function CheckInAction({ checkedInToday, id }) {
  const { t } = useTranslation();
  const { mutateAsync: checkIn, isPending: isCheckingIn } = useCheckIn();

  const handleCheckIn = async () => {
    try {
      await checkIn(id);
      notifications.show({
        title: t("habits.summary.checkInNotificationTitle"),
        message: t("habits.summary.checkInNotificationMessage"),
        color: "green",
      });
    } catch {
      notifications.show({
        title: t("habits.summary.checkInFailedTitle"),
        message: t("habits.summary.checkInFailedMessage"),
        color: "red",
      });
    }
  };

  return (
    <div className="mt-1 flex">
      {checkedInToday ? (
        <Button
          disabled
          variant="default"
          radius="md"
          size="compact-md"
          leftSection={<IconCircleDashedCheck size={18} />}
          className="grow"
        >
          {t("habits.summary.checkedInToday")}
        </Button>
      ) : (
        <Button
          onClick={handleCheckIn}
          loading={isCheckingIn}
          variant="filled"
          radius="md"
          size="compact-md"
          leftSection={<IconCircleDashedPlus size={18} />}
          className="grow"
        >
          {t("habits.summary.markCompleted")}
        </Button>
      )}
    </div>
  );
}

function WeeklyProgressBar({ percent }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grow bg-gray-100 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sm font-semibold text-gray-700 tabular-nums">{percent}%</p>
    </div>
  );
}

function SummaryHeader({ name, description, currentStreak }) {
  return (
    <>
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
        {currentStreak > 0 && (
          <div className="flex items-center gap-1 shrink-0 px-2 py-1 bg-orange-50 rounded-lg">
            <IconFlame size={16} className="text-orange-500" />
            <p className="text-sm font-semibold text-orange-500">
              {currentStreak}
            </p>
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
      )}
    </>
  );
}

export default function HabitSummary({
  id,
  name,
  description,
  checkedInToday,
  currentStreak,
  weeklyCheckins,
}) {
  const weeklyCheckinsPercent = Math.min(
    100,
    Math.round((weeklyCheckins / 7) * 100)
  );
  return (
    <div className="flex flex-col p-5 sm:p-6 border border-gray-100 rounded-xl gap-4 hover:shadow-md transition-all duration-300">
      <SummaryHeader
        name={name}
        description={description}
        currentStreak={currentStreak}
      />
      <WeeklyProgressBar percent={weeklyCheckinsPercent} />
      <CheckInAction checkedInToday={checkedInToday} id={id} />
      <ActionButtons id={id} />
    </div>
  );
}
