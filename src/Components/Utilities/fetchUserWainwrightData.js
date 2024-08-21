import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export async function fetchUserWainwrightData(userId) {
  try {
    const res = await apiClient.get(`${API_BASE_URL}userwainwrights/${userId}`);
    return res.data.$values || [];
  } catch (err) {
    if (err.name !== "AbortError") {
      console.error("Error fetching user Wainwright data:", err);
    }
    throw err;
  }
}
