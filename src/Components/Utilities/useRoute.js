import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Loading } from "./Loading";

export function useRoute(id) {
  const [route, setRoute] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // UseEffect to load data
  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Routes/${id}`);
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
