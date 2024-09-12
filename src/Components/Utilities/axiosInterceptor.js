import axios from "axios";
import { toast } from "react-toastify";
import handleHomeNavigate from "./handleHomeNavigate";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// flag to track if the logout action has been triggered
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
    return response;
  },
  async (error) => {
    console.log("Error", error);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400) &&
      !isLoggingOut
    ) {
      isLoggingOut = true;
      toast.warning("Your session has expired");
      // store.dispatch(Logout());
      handleHomeNavigate();
    }
  },
);

export default apiClient;
