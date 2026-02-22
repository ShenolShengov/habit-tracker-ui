import {
  IconCircleDashedCheck,
  IconCircleDashedPlus,
  IconEdit,
  IconEye,
  IconFlame,
  IconTrash,
} from "@tabler/icons-react";
import { Link } from "react-router";
import useDeleteHabit from "../../../hooks/habits/useDeleteHabit";
import useCheckIn from "../../../hooks/checkIn/useCheckIn";

function ActionButtons({ id }) {
  const { mutateAsync: deleteHabitMutation, isPending: isDeleteLoading } =
    useDeleteHabit();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this habit?")) {
      await deleteHabitMutation(id);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        to={`/habits/edit/${id}`}
        className="grow basis-0 min-w-[80px] border py-2 rounded-lg border-gray-200 flex items-center justify-center gap-1.5 no-underline text-inherit text-sm hover:bg-gray-50 transition-all duration-200"
      >
        <IconEdit size={15} stroke={1.5} />
        <span>Edit</span>
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleteLoading}
        className="grow basis-0 min-w-[80px] cursor-pointer bg-red-500 hover:bg-red-600 transition-all duration-200 text-white py-2 rounded-lg flex items-center justify-center gap-1.5 text-sm border-none"
      >
        <IconTrash size={15} stroke={1.5} />
        <span className="font-medium">Delete</span>
      </button>
      <Link
        to={`/habits/details/${id}`}
        className="grow basis-0 min-w-[80px] border py-2 rounded-lg border-gray-200 flex items-center justify-center gap-1.5 no-underline text-inherit text-sm hover:bg-gray-50 transition-all duration-200"
      >
        <IconEye size={15} stroke={1.5} />
        <span>Details</span>
      </Link>
    </div>
  );
}

function CheckInAction({ checkedInToday, id }) {
  const { mutateAsync: checkIn } = useCheckIn();

  const handleCheckIn = async () => {
    try {
      await checkIn(id);
    } catch {
      alert("Error occurred while checking in. Please try again later.");
    }
  };

  return (
    <div className="mt-1 flex">
      {checkedInToday ? (
        <button
          disabled
          className="grow py-2.5 text-sm bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center gap-2 border-none"
        >
          <IconCircleDashedCheck size={18} />
          Checked in today
        </button>
      ) : (
        <button
          onClick={handleCheckIn}
          className="grow py-2.5 text-sm font-medium cursor-pointer active:scale-[0.98] transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 border-none"
        >
          <IconCircleDashedPlus size={18} />
          Mark today as completed
        </button>
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
