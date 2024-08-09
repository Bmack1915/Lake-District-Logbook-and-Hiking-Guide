import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { logout } from "../../redux/userSlice";
import { store } from "../../redux/store";
import { toast } from "react-toastify";
import handleHomeNavigate from "./handleHomeNavigate";

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
  (error) => {
    console.log("Error", error);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400) &&
      !isLoggingOut
    ) {
      isLoggingOut = true; // Set the flag to true
      toast.warning("Your session has expired");
      store.dispatch(logout());
      handleHomeNavigate();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
