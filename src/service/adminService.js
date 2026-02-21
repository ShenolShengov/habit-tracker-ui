import api from "../api/api";
import endpoints from "../api/endpoints";

const adminService = {
  async getUsers({ includeDeleted = false, page = 0, size = 20, sort = "createdAt", signal }) {
    const res = await api.get(endpoints.admin.users, {
      signal,
      params: { includeDeleted, page, size, sort },
    });
    return res.data;
  },
};

export default adminService;
