// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import wainwrightReducer from "./wainwrightSlice";
import routeReducer from "./routeSlice";
import userReducer from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["user"],
};

const rootReducer = combineReducers({
  wainwright: wainwrightReducer,
  route: routeReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
