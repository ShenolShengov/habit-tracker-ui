import dayjs from "dayjs";
import api from "../api/api";
import endpoints from "../api/endpoints";

const habitService = {
  async getAll({ signal, page = 0, size = 20 }) {
    const res = await api.get(endpoints.habits.base, {
      signal,
      params: { page, size },
    });
    return res.data;
  },
  async getWeeklyProgresses({ signal }) {
    const startOfWeek = dayjs().startOf("isoWeek").toISOString();
    const today = dayjs().toISOString();
    const { data } = await api.get(endpoints.checkins.userBase, {
      signal,
      params: {
        from: startOfWeek,
        to: today,
        size: 9999,
      },
    });

    const { content } = data;
    const progress = content.reduce((acc, cur) => {
      acc[cur.habitId] = (acc[cur.habitId] ?? 0) + 1;
      return acc;
    }, {});
    return progress;
  },
  add(data) {
    return api.post(endpoints.habits.base, {
      name: data.name.trim(),
      description: data.description.trim(),
    });
  },
  edit({ id, initialData, data }) {
    const updatedData = Object.entries(initialData).reduce(
      (acc, [key, value]) => {
        if (value !== data[key]?.trim()) acc[key] = data[key]?.trim();
        return acc;
      },
      {}
    );
    return api.patch(endpoints.habits.byId(id), updatedData);
  },
  async byId(id, { signal }) {
    const res = await api.get(endpoints.habits.byId(id, { signal }));
    return res.data;
  },
  async deleteById(id) {
    return api.delete(endpoints.habits.byId(id));
  },
};

export default habitService;
