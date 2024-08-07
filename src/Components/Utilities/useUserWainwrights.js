import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export function useUserWainwrights(userId) {
  const [userWainwrights, setUserWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserWainwrightData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}userwainwrights/${userId}`);
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

  return { userWainwrights, isLoading, fetchUserWainwrightData };
}
