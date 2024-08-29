import { useState } from "react";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/userSlice";

function useCreateRouteLog() {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  async function CreateUserRouteLog(log) {
    setIsLoading(true);
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}userroutes/`,
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
        toast.success("Route log successfully created!");
        dispatch(fetchUserData(userId));
      } else {
        toast.error("Failed to update log.");
      }
    } catch (error) {
      console.error("Error updating log:", error);
      toast.error("An error occurred while updating the log.");
    } finally {
      setIsLoading(false);
    }
  }

  return { CreateUserRouteLog, isLoading };
}

export default useCreateRouteLog;
