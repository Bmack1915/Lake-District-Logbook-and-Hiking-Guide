import { useState, useEffect } from "react";
import { API_BASE_URL } from "./apiConfig";
import { Loading } from "./Loading";
import apiClient from "./axiosInterceptor";

export async function useRoute(id) {
  const [route, setRoute] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // UseEffect to load data
  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const res = await apiClient.get(`${API_BASE_URL}Routes/${id}`);
        console.log(res.data);
        setRoute(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRouteData();
    } else {
      setIsLoading(true);
    }
  }, [id]);

  return { route, isLoading };
}
