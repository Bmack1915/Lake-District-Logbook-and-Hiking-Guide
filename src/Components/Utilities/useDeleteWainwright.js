import { useSelector } from "react-redux";
import { API_BASE_URL } from "./apiConfig";
import axios from "axios";
import { useCallback } from "react";

function useDeleteWainwright() {
  const userId = useSelector((state) => state.user.id);

  const handleRemoveWainwright = useCallback(
    async (id) => {
      try {
        await axios.delete(`${API_BASE_URL}userwainwrights/${userId}/${id}`);
        alert("Wainwright successfully removed!");
      } catch (err) {
        alert(`${err.response?.data || "Error removing Wainwright"}!!!`);
        console.error("Error removing Wainwright:", err);
      }
    },
    [userId],
  );

  return handleRemoveWainwright;
}

export default useDeleteWainwright;
