import { useMutation, useQueryClient } from "@tanstack/react-query";
import habitService from "../../service/habitService";

export default function useDeleteHabit(options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-habit"],
    mutationFn: habitService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["stats-overview"] });
      queryClient.invalidateQueries({ queryKey: ["stats-weekly"] });
      queryClient.invalidateQueries({ queryKey: ["stats-best-streak"] });
    },
    ...options,
  });
}
