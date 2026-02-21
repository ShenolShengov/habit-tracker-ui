const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  user: {
    me: "/me",
  },
  habits: {
    base: "/habits",
    byId: (id) => `/habits/${id}`,
    stats: (id) => `/habits/${id}/stats`,
  },
  checkins: {
    userBase: "/check-ins",
    habitBase: (id) => `/habits/${id}/check-ins`,
  },
  stats: {
    overview: "/stats/overview",
    weekly: "/stats/weekly",
    bestStreak: "/stats/best-streak",
  },
  admin: {
    users: "/users",
  },
};
export default endpoints;
