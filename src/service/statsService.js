import api from "../api/api";
import endpoints from "../api/endpoints";

const statsService = {
  async getOverview({ signal }) {
    const res = await api.get(endpoints.stats.overview, { signal });
    return res.data;
  },
  async getWeeklySummary({ signal }) {
    const res = await api.get(endpoints.stats.weekly, { signal });
    return res.data;
  },
  async getBestStreak({ signal }) {
    const res = await api.get(endpoints.stats.bestStreak, { signal });
    return res.data;
  },
};

export default statsService;
