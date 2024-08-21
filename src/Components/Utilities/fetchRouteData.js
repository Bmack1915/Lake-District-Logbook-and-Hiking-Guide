import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export const fetchRouteData = async (id) => {
  try {
    const res = await apiClient.get(`${API_BASE_URL}Routes/${id}`);
    return res;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
