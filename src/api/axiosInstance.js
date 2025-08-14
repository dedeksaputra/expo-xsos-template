import axios from "axios";
import { getUserToken } from "../services/StorageService";
import config from "../../config";

const api = axios.create({
  baseURL: config.baseUrl, // ganti ke IP lokal/server yang sesuai
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getUserToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Gagal mengambil token:", err);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

export default api;
