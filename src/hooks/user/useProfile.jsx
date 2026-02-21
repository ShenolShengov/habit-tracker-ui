import { useQuery } from "@tanstack/react-query";
import userService from "../../service/userService";

export default function useProfile(options) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: ({ signal }) => userService.getProfile({ signal }),
    ...options,
  });
}
