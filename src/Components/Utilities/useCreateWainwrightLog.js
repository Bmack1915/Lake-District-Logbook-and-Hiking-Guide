import { useState } from "react";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";

function useCreateWainwrightLog() {
  const [isLoading, setIsLoading] = useState(false);

  async function CreateUserWainwrightLog(log, isRouteLogging = false) {
    setIsLoading(true); // Set loading to true before the request
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}userwainwrights/`,
        JSON.stringify(log),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (
        response.status === 201 ||
        response.status === 200 ||
        response.status === 204
      ) {
        toast.success("Wainwright log successfully created!");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        if (isRouteLogging) {
          // If this is route logging, simply continue without showing an error
          console.log(
            "Wainwright log already exists. Continuing route logging...",
          );
        } else {
          // If it's not route logging, treat it as a warning
          toast.warning("Wainwright log already exists.");
        }
      } else {
        console.error("Error creating log:", error);
        toast.error("An error occurred while creating the log.");
      }
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  }

  return { CreateUserWainwrightLog, isLoading };
}

export default useCreateWainwrightLog;
