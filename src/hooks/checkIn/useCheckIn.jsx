import { useMutation, useQueryClient } from "@tanstack/react-query";
import checkInService from "../../service/checkInService";

export default function useCheckIn(options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["check-in"],
    mutationFn: checkInService.checkIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habit"] });
      queryClient.invalidateQueries({ queryKey: ["stats-overview"] });
      queryClient.invalidateQueries({ queryKey: ["stats-weekly"] });
      queryClient.invalidateQueries({ queryKey: ["stats-best-streak"] });
      queryClient.invalidateQueries({ queryKey: ["checkins-calendar"] });
      queryClient.invalidateQueries({ queryKey: ["checkins-chart"] });
      queryClient.invalidateQueries({ queryKey: ["habit-stats"] });
    },
    ...options,
  });
}
