import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  routes: [],
  filteredRoutes: [],
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
  },
});

export const { setRoutes, setFilteredRoutes } = routeSlice.actions;

export function fetchRoutes() {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}Routes`,
      );
      const data = await res.data.$values;
      dispatch(setRoutes(data));
    } catch (error) {
      console.error("Failed to fetch wainwrights:", error);
    }
  };
}

export default routeSlice.reducer;
