import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../Components/Utilities/apiConfig";

const initialState = {
  routes: [],
  filteredRoutes: [],
  selectedRoute: null,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoutes(state, action) {
      state.routes = action.payload;
    },
    setFilteredRoutes(state, action) {
      state.filteredRoutes = action.payload;
    },
    setSelectedRouteById(state, action) {
      state.selectedRoute = state.routes.filter(
        (r) => r.routeID === Number(action.payload),
      )[0];
    },
  },
});

export const { setRoutes, setFilteredRoutes, setSelectedRouteById } =
  routeSlice.actions;

export function fetchRoutes() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${API_BASE_URL}Routes`);
      const data = await res.data.$values;
      dispatch(setRoutes(data));
    } catch (error) {
      console.error("Failed to fetch wainwrights:", error);
    }
  };
}

export default routeSlice.reducer;
