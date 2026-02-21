import { useQuery } from "@tanstack/react-query";
import statsService from "../../service/statsService";

export default function useBestStreak(options) {
  return useQuery({
    queryKey: ["stats-best-streak"],
    queryFn: ({ signal }) => statsService.getBestStreak({ signal }),
    ...options,
  });
}
