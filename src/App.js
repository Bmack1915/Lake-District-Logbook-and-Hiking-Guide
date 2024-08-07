import "./App.css";
import "./index.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchWainwrights } from "./redux/wainwrightSlice.js";
import { useEffect } from "react";
import { fetchRoutes } from "./redux/routeSlice.js";

import Login from "./Pages/LoginPage.js";
import FinderMapPage from "./Pages/FinderMapPage.js";
import RouteHomePage from "./Pages/RouteHomePage.js";
import AuthCheck from "./Components/Authorization/AuthCheck.js";
import Logbook from "./Pages/LogbookPage.js";
import WainwrightInfoPage from "./Pages/WainwrightInfoPage.js";
import LandingPage from "./Pages/LandingPage.js";
import AppLayout from "./Pages/AppLayout.js";
import Sidebar from "./Components/MapComponents/Map/Sidebar.js";

function App() {
  localStorage.clear();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWainwrights());
    dispatch(fetchRoutes());
  }, [dispatch]);

  return (
    <div className="font-inconsolata">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="sidebar" element={<Sidebar />} />
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
              path="/routeFinder"
              element={
                <AuthCheck>
                  <FinderMapPage key="routes" type="routes" />
                </AuthCheck>
              }
            />

            <Route
              path="/wainwrightFinder"
              element={
                <AuthCheck>
                  <FinderMapPage key="wainwrights" type="wainwrights" />
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
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
