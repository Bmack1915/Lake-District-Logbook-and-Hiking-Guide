import { useEffect, useState } from "react";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";

function useAssociatedWainwrights(route) {
  const [associatedWainwrights, setAssociatedWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAssociatedWainwrights() {
      try {
        setIsLoading(true);
        const res = await apiClient.get(
          `${API_BASE_URL}WainwrightRoutes/wainwrights/fromRoute/${route.routeID}`,
        );
        const wainwrightObjs = res.data.$values;
        setAssociatedWainwrights(wainwrightObjs);
      } catch (error) {
        console.error("Failed to fetch associated Wainwrights:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (route?.routeID) {
      getAssociatedWainwrights();
    }
  }, [route.routeID]);

  return { isLoading, associatedWainwrights };
}

export default useAssociatedWainwrights;
