import { useSelector } from "react-redux";
import { API_BASE_URL } from "./apiConfig";
import { useCallback } from "react";
import apiClient from "./axiosInterceptor";
import { AddToQueueSharp } from "@mui/icons-material";
import { toast } from "react-toastify";

function useDeleteWainwright() {
  const userId = useSelector((state) => state.user.id);

  const handleRemoveWainwright = useCallback(
    async (id) => {
      try {
        await apiClient.delete(
          `${API_BASE_URL}userwainwrights/${userId}/${id}`,
        );
        toast.success("Wainwright successfully removed!");
      } catch (err) {
        toast.error(`${err.response?.data || "Error removing Wainwright"}!!!`);
        console.error("Error removing Wainwright:", err);
      }
    },
    [userId],
  );

  return handleRemoveWainwright;
}

export default useDeleteWainwright;
