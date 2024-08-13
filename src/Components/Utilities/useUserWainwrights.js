import { useState, useEffect } from "react";
import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export function useUserWainwrights(userId) {
  const [userWainwrights, setUserWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const controller = new AbortController();
  async function fetchUserWainwrightData() {
    setIsLoading(true);
    try {
      const res = await apiClient.get(
        `${API_BASE_URL}userwainwrights/${userId}`,
        { signal: controller.signal },
      );
      setUserWainwrights(res.data.$values || []);
    } catch (err) {
      if (err.name !== "AbortError") console.error("Error fetching data:", err);
      setUserWainwrights([]);
    } finally {
      setIsLoading(false);
    }
    return function () {
      controller.abort();
    };
  }

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
