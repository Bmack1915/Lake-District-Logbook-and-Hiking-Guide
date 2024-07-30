import { createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../Components/Utilities/apiConfig";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const initialState = {
  email: "",
  isAuthenticated: false,
  //Individual Wainwrights, the GET from the API gets just the wainwrights
  userWainwrights: [],
  //The GET from the api returns the UserRoute Object which contains the route info, as we need the description etc.
  userRoutes: [],
  id: "",
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
        if (Cookies.get("token")) state.isAuthenticated = true;
      },
    },
    logout(state) {
      return initialState;
    },
    setUserWainwrights(state, action) {
      state.userWainwrights = action.payload;
    },
    setUserRoutes(state, action) {
      state.userRoutes = action.payload;
    },
    addUserRoute(state, action) {
      state.userRoutes = [...state.userRoutes, action.payload];
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
export function UpdateUserInfo() {
  return async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
      const resWainwrights = await axios.get(
        `${API_BASE_URL}userwainwrights/${userId}`,
      );
      const userWainwrights = resWainwrights.data.$values;

      dispatch(setUserWainwrights(userWainwrights));
    } catch (error) {
      console.error("Failed to fetch wainwrights:", error);
    }
    try {
      const resRoutes = await axios.get(`${API_BASE_URL}userroutes/${userId}`);
      const userRoutes = resRoutes.data.$values;
      console.log("User routes fetched:", userRoutes);
      dispatch(setUserRoutes(userRoutes));
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  };
}

export function LoginAndFetchUserInfo(email, password) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${API_BASE_URL}account/login`, {
        Email: email,
        Password: password,
      });

      const { token } = response.data;
      Cookies.set("token", token, { expires: 1 });
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.nameid;

      dispatch(login(email, userId));
      console.log("user logged in");

      try {
        const res = await axios.get(`${API_BASE_URL}userwainwrights/${userId}`);
        const userWainwrights = res.data.$values;
        console.log("userwainrights are:", userWainwrights);
        dispatch(setUserWainwrights(userWainwrights));
      } catch (error) {
        console.error("Failed to fetch wainwrights:", error);
      }
      try {
        const res = await axios.get(`${API_BASE_URL}userroutes/${userId}`);
        const userRoutes = res.data.$values;
        console.log("User routes are,", userRoutes);
        dispatch(setUserRoutes(userRoutes));
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };
}

export default userSlice.reducer;
export const {
  login,
  logout,
  setUserWainwrights,
  setUserRoutes,
  addUserRoute,
  deleteUserRoute,
} = userSlice.actions;
