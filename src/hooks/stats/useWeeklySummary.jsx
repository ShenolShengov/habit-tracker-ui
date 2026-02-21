import { useQuery } from "@tanstack/react-query";
import statsService from "../../service/statsService";

export default function useWeeklySummary(options) {
  return useQuery({
    queryKey: ["stats-weekly"],
    queryFn: ({ signal }) => statsService.getWeeklySummary({ signal }),
    ...options,
  });
}
