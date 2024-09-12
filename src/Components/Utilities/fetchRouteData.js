import apiClient from "./axiosInterceptor";

export const fetchRouteData = async (id) => {
  try {
    const res = await apiClient.get(
      `${process.env.REACT_APP_API_BASE_URL}Routes/${id}`,
    );
    return res;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
