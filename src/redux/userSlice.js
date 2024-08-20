import { createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../Components/Utilities/apiConfig";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { act } from "react";

const initialState = {
  name: "",
  email: "",
  id: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: {
      prepare(email, id, token) {
        return {
          payload: {
            email,
            id,
            token,
          },
        };
      },
      reducer(state, action) {
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.token = action.payload.token;
      },
    },
    register(state, action) {
      state.name = action.payload;
    },
    logout(state) {
      return initialState;
    },

    deleteUserRoute: {
      prepare(id, routeID) {
        return {
          payload: {
            id,
            routeID,
          },
        };
      },
      reducer(state, action) {
        state.userRoutes = state.userRoutes.filter(
          (ur) =>
            ur.id !== action.payload.id &&
            ur.routeID !== action.payload.routeID,
        );
      },
    },
  },
});

export function LoginAndFetchUserInfo(email, password) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${API_BASE_URL}account/login`, {
        Email: email,
        Password: password,
      });

      const { token } = response.data;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.nameid;

      // Save email, id, token to sessionStorage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userId", userId);

      dispatch(login(email, userId, token));
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };
}

export function Logout() {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${API_BASE_URL}account/logout`);
      console.log("Logout Response", response);

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("userId");

      dispatch(logout());
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
}

export default userSlice.reducer;
export const { login, logout, register } = userSlice.actions;
