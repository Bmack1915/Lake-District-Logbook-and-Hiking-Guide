import { configureStore } from "@reduxjs/toolkit";
import wainwrightReducer from "./wainwrightSlice";
import routeReducer from "./routeSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    wainwright: wainwrightReducer,
    route: routeReducer,
    user: userReducer,
  },
});

export default store;
