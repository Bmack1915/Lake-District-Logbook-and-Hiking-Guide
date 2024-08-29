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
    if (isSubmitting) return; // Prevent duplicate submissions
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
    // } catch (error) {
    // if (error.response && error.response.status === 409) {
    //   console.log("Error from API", error);
    //   if (isRouteLogging) {
    //     console.log(
    //       "Wainwright log already exists. Continuing route logging...",
    //     );
    //   }
    // } else {
    //   console.error("Error creating log:", error);
    //   toast.error("An error occurred while creating the log.");
    // }
    // } finally {
    await dispatch(fetchUserData(id));
    isSubmitting = false;
    setIsLoading(false); // Set loading to false after the request completes
    // }
  }

  return { CreateUserWainwrightLog, isLoading };
}

export default useCreateWainwrightLog;
