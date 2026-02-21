import { useQuery } from "@tanstack/react-query";
import adminService from "../../service/adminService";

export default function useUsers({ includeDeleted = false, page = 0, size = 20 } = {}, options) {
  return useQuery({
    queryKey: ["admin-users", includeDeleted, page, size],
    queryFn: ({ signal }) => adminService.getUsers({ includeDeleted, page, size, signal }),
    ...options,
  });
}
