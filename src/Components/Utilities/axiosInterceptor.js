import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Define a flag to track if the logout action has been triggered
let isLoggingOut = false;

// Request interceptor to add the token to the headers
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  async (error) => {
    console.log("Error", error);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400) &&
      !isLoggingOut
    ) {
      isLoggingOut = true; // Set the flag to true
      toast.warning("Your session has expired");
      // store.dispatch(Logout());
      // handleHomeNavigate();
    }
    if (error.response.status === 403) {
      console.log("403 error");
      try {
        const newAccessToken = await refreshToken();
        // Retry the original request with the new token
        const originalRequest = error.config;
        // originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;
        return await axios(originalRequest);
      } catch (error_1) {
        // Handle refresh token error or redirect to login
        throw error_1;
      }
    }
    return Promise.reject(error);
  },
);

async function refreshToken() {
  try {
    console.log("refreshToken");
    const response = await axios.post(
      "http://localhost:5000/auth/refresh",
      null,
      {
        withCredentials: true,
      },
    );
    console.log("response from refreshapi ", response);
    return response.data; // Assuming response contains the new access token
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Propagate error to caller
  }
}

export default apiClient;
