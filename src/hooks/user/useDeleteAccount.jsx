import { useMutation } from "@tanstack/react-query";
import userService from "../../service/userService";

export default function useDeleteAccount(options) {
  return useMutation({
    mutationKey: ["delete-account"],
    mutationFn: userService.deleteAccount,
    ...options,
  });
}
