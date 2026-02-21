import api from "../api/api";
import endpoints from "../api/endpoints";

const userService = {
  async getProfile({ signal }) {
    const res = await api.get(endpoints.user.me, { signal });
    return res.data;
  },
  updateProfile(data) {
    return api.put(endpoints.user.me, data, { withCredentials: true });
  },
  deleteAccount() {
    return api.delete(endpoints.user.me);
  },
};

export default userService;
