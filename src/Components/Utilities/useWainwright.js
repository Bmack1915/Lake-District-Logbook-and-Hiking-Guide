import { useState, useEffect } from "react";
import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export function useWainwright(id) {
  const [wainwright, setWainwright] = useState(null);
  const [isLoadingWainwright, setIsLoading] = useState(true);

  // UseEffect to load data
  useEffect(() => {
    async function fetchWainwrightData() {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await apiClient.get(`${API_BASE_URL}wainwrights/${id}`);
        setWainwright(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    fetchWainwrightData();
  }, [id]);

  return { wainwright, isLoadingWainwright };
}
