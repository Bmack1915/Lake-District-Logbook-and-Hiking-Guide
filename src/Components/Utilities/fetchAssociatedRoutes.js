import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export async function getAssociatedRoutes(wainwright) {
  try {
    const res = await apiClient.get(
      `${API_BASE_URL}WainwrightRoutes/routes/fromWainwright/${wainwright.wainwrightID}`,
    );
    const routeObjs = res.data.$values;
    return routeObjs;
  } catch (error) {
    console.error("Failed to fetch associated Wainwrights:", error);
  }
}
