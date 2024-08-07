import "./App.css";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import HomePage from "./Pages/HomePage.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWainwrights());
    dispatch(fetchRoutes());
  }, [dispatch]);
  const user = useSelector((state) => state.user);
  console.log("Current User", user);

  return (
    <div className="font-inconsolata">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />

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
