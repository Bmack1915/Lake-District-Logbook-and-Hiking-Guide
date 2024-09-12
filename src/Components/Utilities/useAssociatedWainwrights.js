import { useEffect, useState } from "react";
import apiClient from "./axiosInterceptor";

export async function getAssociatedWainwrights(routeID) {
  if (!routeID) return [];

  try {
    const res = await apiClient.get(
      `${process.env.REACT_APP_API_BASE_URL}WainwrightRoutes/wainwrights/fromRoute/${routeID}`,
    );
    return res.data.$values || [];
  } catch (error) {
    console.error("Failed to fetch associated Wainwrights:", error);
    throw error;
  }
}

function useAssociatedWainwrights(route) {
  const [associatedWainwrights, setAssociatedWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!route || !route.routeID) {
        setAssociatedWainwrights([]);
        return;
      }

      try {
        setIsLoading(true);
        const wainwrightObjs = await getAssociatedWainwrights(route.routeID);
        setAssociatedWainwrights(wainwrightObjs);
      } catch (error) {
        console.error("Failed to fetch associated Wainwrights:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [route]);

  return { isLoading, associatedWainwrights };
}

export default useAssociatedWainwrights;
