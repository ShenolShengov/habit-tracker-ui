import {
  IconChecks,
  IconFlame,
  IconTrophy,
  IconCalendar,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
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
    <div className="flex justify-center items-center p-4 sm:p-6 flex-col gap-2 sm:gap-3 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
      <div className={`p-2 sm:p-2.5 rounded-xl ${colorMap[color]}`}>
        <Icon size={22} stroke={1.5} />
      </div>
      <h3 className="uppercase text-[10px] sm:text-xs text-gray-400 tracking-wider font-medium text-center">
        {name}
      </h3>
      <p className="text-lg sm:text-2xl font-semibold text-center">{value}</p>
    </div>
  );
}

export default function HabitStats() {
  const { id } = useParams();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const fetchHabitStats = async () => {
    const res = await api.get(endpoints.habits.stats(id));
    return res.data;
  };

  const { data: stats, isLoading } = useQuery({
    queryKey: ["habit-stats", id],
    queryFn: fetchHabitStats,
  });

  const locale = i18n.language?.startsWith("bg") ? "bg-BG" : "en-US";
  const formattedCreatedOn = new Date(stats?.createdAt).toLocaleDateString(
    locale,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: user.timeZone,
    }
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl sm:text-2xl font-semibold">{t("habits.details.overallStats")}</h2>
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
              name={t("habits.details.totalCheckIns")}
              value={stats.totalCheckIns}
              Icon={IconChecks}
              color="green"
            />
            <Stat
              name={t("habits.details.currentStreak")}
              value={`${stats.streaks.currentDays} ${t("habits.details.days")}`}
              Icon={IconFlame}
              color="orange"
            />
            <Stat
              name={t("habits.details.bestStreak")}
              value={`${stats.streaks.best.days} ${t("habits.details.days")}`}
              Icon={IconTrophy}
              color="yellow"
            />
            <Stat
              name={t("habits.details.createdOn")}
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
