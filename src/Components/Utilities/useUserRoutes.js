import { useState, useEffect } from "react";
import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export function useUserRoutes(userId) {
  const [userRoutes, setUserRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserRouteData = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get(`${API_BASE_URL}userroutes/${userId}`);
      setUserRoutes(res.data.$values);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserRouteData();
    } else {
      setIsLoading(false); // Set loading to false if no userId is available
    }
  }, [userId]);

  return { userRoutes, isLoading, fetchUserRouteData };
}
