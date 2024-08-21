import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export const fetchUserRouteData = async (userId) => {
  try {
    const res = await apiClient.get(`${API_BASE_URL}userroutes/${userId}`);
    return res.data.$values;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
