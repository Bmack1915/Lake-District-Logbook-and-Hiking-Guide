import { useState } from "react";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/userSlice";

function useCreateWainwrightLog() {
  const [isLoading, setIsLoading] = useState(false);
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  let isSubmitting = false;

  async function CreateUserWainwrightLog(log, isRouteLogging = false) {
    if (isSubmitting) return;
    isSubmitting = true;
    console.log(log);
    // try {
    const response = await apiClient.post(
      `${API_BASE_URL}userwainwrights/`,
      log,
    );

    if (
      response.status === 201 ||
      response.status === 200 ||
      response.status === 204
    ) {
      toast.success("Wainwright log successfully created!");
    }
    await dispatch(fetchUserData(id));
    isSubmitting = false;
    setIsLoading(false);
  }

  return { CreateUserWainwrightLog, isLoading };
}

export default useCreateWainwrightLog;
