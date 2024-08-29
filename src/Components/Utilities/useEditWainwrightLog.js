import { useState } from "react";
import { useSelector } from "react-redux";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";

function useEditWainwrightLog(wainwrightID) {
  const id = useSelector((state) => state.user.id);
  const [isLoading, setIsLoading] = useState(false);

  async function EditWainwrightLog(log) {
    setIsLoading(true);
    try {
      const response = await apiClient.put(
        `${API_BASE_URL}userwainwrights/${id}?wainwrightID=${wainwrightID}`,
        log,
      );
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        toast.success("Wainwright log successfully updated!");
      } else {
        toast.error("Failed to update log123.");
      }
    } catch (error) {
      console.error("Error updating log:", error);
      toast.error("An error occurred while updating the log.");
    } finally {
      setIsLoading(false);
    }
  }

  return { EditWainwrightLog, isLoading };
}

export default useEditWainwrightLog;
