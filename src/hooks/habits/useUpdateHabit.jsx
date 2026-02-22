import { useMutation, useQueryClient } from "@tanstack/react-query";
import habitService from "../../service/habitService";

export default function useUpdateHabit(options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-habit"],
    mutationFn: habitService.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
    ...options,
  });
}
