import { useState, useEffect } from "react";
import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export function useUserWainwrights(userId) {
  const [userWainwrights, setUserWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserWainwrightData = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get(
        `${API_BASE_URL}userwainwrights/${userId}`,
      );
      setUserWainwrights(res.data.$values);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserWainwrightData();
    } else {
      setIsLoading(false); // Set loading to false if no userId is available
    }
  }, [userId]);

  return {
    userWainwrights,
    setUserWainwrights,
    isLoading,
    fetchUserWainwrightData,
  };
}
