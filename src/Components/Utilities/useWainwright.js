import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Loading } from "./Loading";

export function useWainwright(id) {
  const [wainwright, setWainwright] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // UseEffect to load data
  useEffect(() => {
    const fetchWainwrightData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Wainwrights/${id}`);
        setWainwright(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchWainwrightData();
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return { wainwright, isLoading };
}
