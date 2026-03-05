import { useState } from "react";
import { Calendar } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import dayjs from "dayjs";
import api from "../../../api/api";
import endpoints from "../../../api/endpoints";
import { useAuth } from "../../../store/authContext";

export default function CheckInsHistory({ habitId }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [date, setDate] = useState(dayjs().toDate());

  const visibleYear = dayjs(date).year();

  const { data: checkIns = [] } = useQuery({
    queryKey: ["checkins-calendar", habitId, visibleYear],
    queryFn: async () => {
      const from = dayjs().tz(user.timeZone).year(visibleYear).startOf("year");
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

  const markCheckins = (date) => {
    const formatted = dayjs(date).format("YYYY-MM-DD");
    if (!checkIns.includes(formatted)) {
      return {};
    }
    return {
      className:
        "bg-blue-500! w-full h-full flex justify-center items-center text-white! rounded-lg",
    };
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl sm:text-2xl font-semibold">
        {t("habits.details.checkInHistory")}
      </h2>
      <div className="flex justify-center w-full overflow-x-auto border border-gray-100 rounded-xl p-4 sm:p-6">
        <Calendar
          size={isMobile ? "sm" : "md"}
          getDayProps={markCheckins}
          date={date}
          onDateChange={setDate}
          maxDate={dayjs().toDate()}
          numberOfColumns={isMobile ? 1 : 2}
          hideOutsideDates
        />
      </div>
    </div>
  );
}
