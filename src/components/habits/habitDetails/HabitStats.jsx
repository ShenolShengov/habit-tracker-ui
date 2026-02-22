import {
  IconChecks,
  IconFlame,
  IconTrophy,
  IconCalendar,
} from "@tabler/icons-react";
import { useAuth } from "../../../store/authContext";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";
import endpoints from "../../../api/endpoints";
import { Skeleton } from "@mantine/core";

const colorMap = {
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-500",
  yellow: "bg-yellow-50 text-yellow-500",
  blue: "bg-blue-50 text-blue-600",
};

function Stat({ name, value, Icon, color }) {
  return (
    <div className="flex justify-center items-center p-5 sm:p-6 flex-col gap-3 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
      <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
        <Icon size={24} stroke={1.5} />
      </div>
      <h3 className="uppercase text-xs text-gray-400 tracking-wider font-medium">
        {name}
      </h3>
      <p className="text-xl sm:text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default function HabitStats() {
  const { id } = useParams();
  const { user } = useAuth();

  const fetchHabitStats = async () => {
    const res = await api.get(endpoints.habits.stats(id));
    return res.data;
  };

  const { data: stats, isLoading } = useQuery({
    queryKey: ["habit-stats", id],
    queryFn: fetchHabitStats,
  });

  const formattedCreatedOn = new Date(stats?.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: user.timeZone,
    }
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl sm:text-2xl font-semibold">Overall stats</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {isLoading ? (
          <>
            <Skeleton height={140} radius="lg" />
            <Skeleton height={140} radius="lg" />
            <Skeleton height={140} radius="lg" />
            <Skeleton height={140} radius="lg" />
          </>
        ) : (
          <>
            <Stat
              name="Total check-ins"
              value={stats.totalCheckIns}
              Icon={IconChecks}
              color="green"
            />
            <Stat
              name="Current streak"
              value={`${stats.streaks.currentDays} Day/s`}
              Icon={IconFlame}
              color="orange"
            />
            <Stat
              name="Best streak"
              value={`${stats.streaks.best.days} Day/s`}
              Icon={IconTrophy}
              color="yellow"
            />
            <Stat
              name="Created on"
              value={formattedCreatedOn}
              Icon={IconCalendar}
              color="blue"
            />
          </>
        )}
      </div>
    </div>
  );
}
