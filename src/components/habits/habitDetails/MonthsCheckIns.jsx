import { useState } from "react";
import { BarChart } from "@mantine/charts";
import { ActionIcon, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import api from "../../../api/api";
import endpoints from "../../../api/endpoints";
import { useAuth } from "../../../store/authContext";

const ALL_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthsCheckIns({ habitId }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const checkInsLabel = t("habits.details.checkInsChartLabel");
  const currentYear = dayjs().year();
  const [viewedYear, setViewedYear] = useState(currentYear);

  const { data: checkIns = [] } = useQuery({
    queryKey: ["checkins-chart", habitId, viewedYear],
    queryFn: async () => {
      const from = dayjs().tz(user.timeZone).year(viewedYear).startOf("year");
      const to = from.endOf("year");
      const res = await api.get(endpoints.checkins.habitBase(habitId), {
        params: {
          sort: "createdAt",
          size: 366,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      });
      return res.data.content.map((c) =>
        dayjs(c.createdAt).format("YYYY-MM-DD")
      );
    },
    placeholderData: keepPreviousData,
  });

  const yearInfo = () => {
    const yearStats = checkIns.reduce((acc, c) => {
      const month = dayjs(c).format("MMM");
      acc[month] = (acc[month] ?? 0) + 1;
      return acc;
    }, {});

    return ALL_MONTHS.map((month) => ({
      month,
      [checkInsLabel]: yearStats[month] ?? 0,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold">
          {t("habits.details.checkInsByMonth", { year: viewedYear })}
        </h2>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => setViewedYear((y) => y - 1)}
          >
            <IconChevronLeft size={18} />
          </ActionIcon>
          <Text size="sm" fw={500} w={40} ta="center">
            {viewedYear}
          </Text>
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => setViewedYear((y) => y + 1)}
            disabled={viewedYear >= currentYear}
          >
            <IconChevronRight size={18} />
          </ActionIcon>
        </Group>
      </div>
      <div className="border border-gray-100 rounded-xl p-4 sm:p-6">
        <BarChart
          h={isMobile ? 220 : 300}
          data={yearInfo()}
          dataKey="month"
          series={[{ name: checkInsLabel, color: "blue.6" }]}
          tickLine="y"
        />
      </div>
    </div>
  );
}
