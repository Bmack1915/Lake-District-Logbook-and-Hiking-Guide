import "./App.css";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWainwrights } from "./redux/wainwrightSlice.js";
import { useEffect } from "react";
import { fetchRoutes } from "./redux/routeSlice.js";

import Login from "./Components/Authorization/Login.js";
import Navbar from "./Components/NavBar.js";
import MapInfoPageGlobal from "./Components/MapHomePage/MapInfoPageGlobal.js";
import RouteHomePage from "./Components/Logging/RouteHomePage.js";
import AuthCheck from "./Components/Authorization/AuthCheck.js";
import Logbook from "./Pages/Logbook.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWainwrights());
    dispatch(fetchRoutes());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/routeinfo"
            element={
              <AuthCheck>
                <RouteHomePage />
              </AuthCheck>
            }
          />
          <Route
            path="/"
            element={
              <AuthCheck>
                <MapInfoPageGlobal />
              </AuthCheck>
            }
          />
          <Route
            path="/logbook"
            element={
              <AuthCheck>
                <Logbook />
              </AuthCheck>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
