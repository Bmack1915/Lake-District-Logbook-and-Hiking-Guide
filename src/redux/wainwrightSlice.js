import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wainwrights: [],
  filteredWainwrights: [],
};

const wainwrightSlice = createSlice({
  name: "wainwright",
  initialState,
  reducers: {
    setWainwrights(state, action) {
      state.wainwrights = action.payload;
    },
    setFilteredWainwrights(state, action) {
      state.filteredWainwrights = action.payload;
    },
  },
});

export const { setWainwrights, setFilteredWainwrights } =
  wainwrightSlice.actions;

export function fetchWainwrights() {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}Wainwrights`,
      );
      const data = await res.data.$values;
      dispatch(setWainwrights(data));
    } catch (error) {
      console.error("Failed to fetch wainwrights:", error);
    }
  };
}

export default wainwrightSlice.reducer;
