import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";
import { fetchUserData } from "../../redux/userSlice";

function useEditRouteLog() {
  const [isLoading, setIsLoading] = useState(false);
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  async function EditRouteLog(log) {
    setIsLoading(true); // Set loading to true before the request
    const routeID = log.routeID;
    try {
      const response = await apiClient.put(
        `${API_BASE_URL}userroutes/${id}?routeID=${routeID}`,
        log,
      );

      console.log("edit response", response);

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        toast.success("Log successfully updated!");
        dispatch(fetchUserData(id));
      } else {
        toast.error("Failed to update log!!!");
      }
    } catch (error) {
      console.error("Error updating log:", error);
      toast.error("An error occurred while updating the log.");
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  }

  return { EditRouteLog, isLoading };
}

export default useEditRouteLog;
