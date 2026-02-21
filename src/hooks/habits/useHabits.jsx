import { useQuery } from "@tanstack/react-query";
import habitService from "../../service/habitService";

const HABIT_QUERY_KEY = "habits";

export default function useHabits({ page = 0, size = 20 } = {}, options) {
  return useQuery({
    queryKey: [HABIT_QUERY_KEY, page, size],
    queryFn: ({ signal }) =>
      Promise.all([
        habitService.getAll({ signal, page, size }),
        habitService.getWeeklyProgresses({ signal }),
      ]),
    ...options,
  });
}
