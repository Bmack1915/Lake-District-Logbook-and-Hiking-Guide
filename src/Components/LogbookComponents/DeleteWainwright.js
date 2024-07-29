import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../Utilities/apiConfig";
import axios from "axios";
import { UpdateUserInfo } from "../../redux/userSlice";
import { useCallback } from "react";

function useDeleteWainwright() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  const handleRemoveWainwright = useCallback(
    async (id) => {
      try {
        await axios.delete(`${API_BASE_URL}userwainwrights/${userId}/${id}`);
        alert("Wainwright successfully removed!");
        dispatch(UpdateUserInfo());
      } catch (err) {
        alert(`${err.response?.data || "Error removing Wainwright"}!!!`);
        console.error("Error removing Wainwright:", err);
      }
    },
    [dispatch, userId],
  );

  return handleRemoveWainwright;
}

export default useDeleteWainwright;
