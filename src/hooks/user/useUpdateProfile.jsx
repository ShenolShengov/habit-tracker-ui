import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "../../service/userService";

export default function useUpdateProfile(options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    ...options,
  });
}
