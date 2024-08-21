import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export async function fetchWainwrightData(id) {
  if (!id) {
    console.log("No ID provided");
    return;
  }
  try {
    const res = await apiClient.get(`${API_BASE_URL}wainwrights/${id}`);
    console.log("API Response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching Wainwright data:", err);
  }
}

export default fetchWainwrightData;
