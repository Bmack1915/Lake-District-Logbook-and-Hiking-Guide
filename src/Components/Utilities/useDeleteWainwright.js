import { useSelector } from "react-redux";
import apiClient from "./axiosInterceptor";
import { toast } from "react-toastify";

function useDeleteWainwright(wainwrightID) {
  const userId = useSelector((state) => state.user.id);

  async function handleRemoveWainwright() {
    try {
      await apiClient.delete(
        `${process.env.REACT_APP_API_BASE_URL}userwainwrights/${userId}/${wainwrightID}`,
      );
      toast.success("Wainwright log successfully removed!");
    } catch (err) {
      toast.error("Error removing Wainwright, please try again");
      console.error("Error removing Wainwright:", err);
    }
  }

  return { handleRemoveWainwright };
}

export default useDeleteWainwright;
