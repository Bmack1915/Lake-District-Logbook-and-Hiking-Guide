import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { logout } from "../../redux/userSlice";
import { store } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import HandleNavigate from "./handleNavigate";
import { toast } from "react-toastify";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

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
  (error) => {
    console.log("Error", error);
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 400)
    ) {
      // If unauthorized, log out the user
      toast.warning("Your session has expired");
      store.dispatch(logout());
      HandleNavigate();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
