import { useEffect, useState } from "react";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";

// The getAssociatedWainwrights function that can be exported and reused
export async function getAssociatedWainwrights(routeID) {
  if (!routeID) return []; // Return empty if no routeID is provided

  try {
    const res = await apiClient.get(
      `${API_BASE_URL}WainwrightRoutes/wainwrights/fromRoute/${routeID}`,
    );
    return res.data.$values || []; // Return the data or an empty array if not available
  } catch (error) {
    console.error("Failed to fetch associated Wainwrights:", error);
    throw error; // Propagate the error to the caller
  }
}

// The custom hook that uses the function internally
function useAssociatedWainwrights(route) {
  const [associatedWainwrights, setAssociatedWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!route || !route.routeID) {
        setAssociatedWainwrights([]); // Reset if no route is selected
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
