import "./App.css";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchWainwrights } from "./redux/wainwrightSlice.js";
import { useEffect } from "react";
import { fetchRoutes } from "./redux/routeSlice.js";

import Login from "./Components/Authorization/Login.js";
import Navbar from "./Components/NavBar.js";
import MapInfoPage from "./Pages/MapInfoPage.js";
import RouteHomePage from "./Pages/RouteHomePage.js";
import AuthCheck from "./Components/Authorization/AuthCheck.js";
import Logbook from "./Pages/LogbookPage.js";
import WainwrightInfoPage from "./Pages/WainwrightInfoPage.js";

function App() {
  localStorage.clear();
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
            path="/routeinfo/:id"
            element={
              <AuthCheck>
                <RouteHomePage />
              </AuthCheck>
            }
          />

          <Route
            path="/wainwrightinfo/:id"
            element={
              <AuthCheck>
                <WainwrightInfoPage />
              </AuthCheck>
            }
          />
          <Route
            path="/"
            element={
              <AuthCheck>
                <MapInfoPage />
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
