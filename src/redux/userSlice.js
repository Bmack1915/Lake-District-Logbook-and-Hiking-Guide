import { createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../Components/Utilities/apiConfig";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: sessionStorage.getItem("userEmail") || "",
  id: sessionStorage.getItem("userId") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: {
      prepare(email, id) {
        return {
          payload: {
            email,
            id,
          },
        };
      },
      reducer(state, action) {
        state.email = action.payload.email;
        state.id = action.payload.id;
      },
    },
    logout(state) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("userId");

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
      sessionStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.nameid;

      // Save email and id to sessionStorage
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userId", userId);

      dispatch(login(email, userId));
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };
}

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
