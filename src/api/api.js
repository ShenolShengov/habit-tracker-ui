import axios from "axios";

const baseURL =
  window.__CONFIG__?.API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

const api = axios.create({
  baseURL,
});


export default api;
