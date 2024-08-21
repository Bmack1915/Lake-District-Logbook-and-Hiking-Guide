import { useState, useEffect } from "react";
import { API_BASE_URL } from "./apiConfig";
import apiClient from "./axiosInterceptor";

export function useWainwright(id) {
  const [wainwright, setWainwright] = useState(null);
  const [isLoadingWainwright, setIsLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    async function fetchWainwrightData() {
      if (!id) {
        console.log("No ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const res = await apiClient.get(`${API_BASE_URL}wainwrights/${id}`);
        console.log("API Response:", res);
        setWainwright(res.data);
      } catch (err) {
        console.error("Error fetching Wainwright data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWainwrightData();
  }, [id]);

  return { wainwright, isLoadingWainwright };
}
