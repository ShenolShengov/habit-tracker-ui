import axios from "axios";

const api = axios.create({
  baseURL: "https://habit-tracker-api-app-1-0-0.onrender.com/api",
});


export default api;
