import { useState } from "react";
import { Calendar } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export default function CheckInsHistory({ checkIns, viewedYear, onYearChange }) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [date, setDate] = useState(dayjs().toDate());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const newYear = dayjs(newDate).year();
    if (newYear !== viewedYear) {
      onYearChange(newYear);
    }
  };

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
      <h2 className="text-xl sm:text-2xl font-semibold">{t("habits.details.checkInHistory")}</h2>
      <div className="flex justify-center w-full overflow-x-auto border border-gray-100 rounded-xl p-4 sm:p-6">
        <Calendar
          size={isMobile ? "sm" : "md"}
          getDayProps={markCheckins}
          date={date}
          onDateChange={handleDateChange}
          maxDate={dayjs().toDate()}
          numberOfColumns={isMobile ? 1 : 2}
          hideOutsideDates
        />
      </div>
    </div>
  );
}
