import { useState } from "react";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";

function useCreateRouteLog() {
  const [isLoading, setIsLoading] = useState(false);

  async function CreateUserRouteLog(log) {
    setIsLoading(true); // Set loading to true before the request
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}userroutes/`,
        JSON.stringify(log),
        {
          headers: {
            "Content-Type": "application/json",
          },
          transformRequest: [(data, headers) => data],
        },
      );

      if (
        response.status === 201 ||
        response.status === 200 ||
        response.status === 204
      ) {
        toast.success("Route log successfully created!");
      } else {
        toast.error("Failed to update log.");
      }
    } catch (error) {
      console.error("Error updating log:", error);
      toast.error("An error occurred while updating the log.");
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  }

  return { CreateUserRouteLog, isLoading };
}

export default useCreateRouteLog;
