import apiClient from "./axiosInterceptor";

export const fetchUserRouteData = async (userId) => {
  try {
    const res = await apiClient.get(
      `${process.env.REACT_APP_API_BASE_URL}userroutes/${userId}`,
    );
    return res.data.$values;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
