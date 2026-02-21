import { useQuery } from "@tanstack/react-query";
import statsService from "../../service/statsService";

export default function useOverview(options) {
  return useQuery({
    queryKey: ["stats-overview"],
    queryFn: ({ signal }) => statsService.getOverview({ signal }),
    ...options,
  });
}
