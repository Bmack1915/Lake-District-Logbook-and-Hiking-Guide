import { configureStore } from "@reduxjs/toolkit";
import wainwrightReducer from "./wainwrightSlice";
import routeReducer from "./routeSlice";

const store = configureStore({
  reducer: {
    wainwright: wainwrightReducer,
    route: routeReducer,
  },
});

export default store;
