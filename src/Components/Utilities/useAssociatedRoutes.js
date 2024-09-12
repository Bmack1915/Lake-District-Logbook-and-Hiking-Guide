import { useEffect, useState } from "react";
import apiClient from "./axiosInterceptor";

function useAssociatedRoutes(wainwright) {
  const [associatedRoutes, setAssociatedRoutes] = useState([]);
  const [isLoadingRoutes, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAssociatedRoutes() {
      try {
        setIsLoading(true);
        const res = await apiClient.get(
          `${process.env.REACT_APP_API_BASE_URL}WainwrightRoutes/routes/fromWainwright/${wainwright.wainwrightID}`,
        );
        const wainwrightObjs = res.data.$values;
        setAssociatedRoutes(wainwrightObjs);
      } catch (error) {
        console.error("Failed to fetch associated Wainwrights:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (wainwright?.wainwrightID) {
      getAssociatedRoutes();
    }
  }, [wainwright.wainwrightID]);

  return { isLoadingRoutes, associatedRoutes };
}

export default useAssociatedRoutes;
