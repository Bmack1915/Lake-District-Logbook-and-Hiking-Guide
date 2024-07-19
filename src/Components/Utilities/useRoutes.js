import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "./apiConfig";
import axios from "axios";

export function useRoutes() {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Use Effect to load data
  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Routes`);
        setRoutes(res.data.$values);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRouteData();
  }, []);

  return { routes, isLoading };
}
