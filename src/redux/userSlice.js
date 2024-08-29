import { fetchUserRouteData } from "../Components/Utilities/fetchUserRouteData";
import { fetchUserWainwrightData } from "../Components/Utilities/fetchUserWainwrightData";
import { createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../Components/Utilities/apiConfig";
import { jwtDecode as decodeJwt } from "jwt-decode";

import { toast } from "react-toastify";
import axios from "axios";

// Initial state
const initialState = {
  name: "",
  email: "",
  id: "",
  token: "",
  userWainwrights: [],
  userRoutes: [],
};

// Redux slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: {
      prepare(email, id, token, name) {
        return {
          payload: {
            email,
            id,
            token,
            name,
          },
        };
      },
      reducer(state, action) {
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.token = action.payload.token;
        state.name = action.payload.name;
      },
    },
    register(state, action) {
      state.name = action.payload;
    },
    logout(state) {
      return initialState;
    },
    setUserRoutes(state, action) {
      state.userRoutes = action.payload;
    },
    setUserWainwrights(state, action) {
      state.userWainwrights = action.payload;
    },
  },
});

// Action creators
export const { login, logout, register, setUserRoutes, setUserWainwrights } =
  userSlice.actions;

// Thunk to fetch user data (user routes and wainwrights)
export function fetchUserData(userId) {
  return async function (dispatch) {
    try {
      // Fetch user routes
      const routesData = await fetchUserRouteData(userId);
      dispatch(setUserRoutes(routesData));

      // Fetch user wainwrights
      const wainwrightsData = await fetchUserWainwrightData(userId);
      dispatch(setUserWainwrights(wainwrightsData));
    } catch (err) {
      console.error("Error fetching user data:", err);
      toast.error("Failed to load user data.");
    }
  };
}

// Thunk for login and fetching user data
export function LoginAndFetchUserInfo(email, password) {
  return async function (dispatch) {
    try {
      // Perform login request
      const response = await axios.post(`${API_BASE_URL}account/login`, {
        Email: email,
        Password: password,
      });

      const { token } = response.data;
      const decodedToken = decodeJwt(token);
      const userId = decodedToken.nameid;
      const name = response.data.name;

      // Save email, id, token to sessionStorage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userId", userId);

      dispatch(login(email, userId, token, name));
      dispatch(fetchUserData(userId));

      toast.success("Login successful!");
      return response;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
      return error;
    }
  };
}

// Thunk for logout
export function Logout() {
  return async function (dispatch) {
    try {
      // Perform logout request
      await axios.post(`${API_BASE_URL}account/logout`);

      // Clear sessionStorage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("userId");

      // Dispatch logout action to reset the state
      dispatch(logout());

      // Optionally, show a success message
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
}

export default userSlice.reducer;
