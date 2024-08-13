import "./App.css";
import "./index.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWainwrights } from "./redux/wainwrightSlice.js";
import { useEffect, useState } from "react";
import { fetchRoutes } from "./redux/routeSlice.js";

import LoginPage from "./Pages/LoginPage.js";
import FinderMapPage from "./Pages/FinderMapPage.js";
import RouteHomePage from "./Pages/RoutePage.js";

import Logbook from "./Pages/LogbookPage.js";
import WainwrightInfoPage from "./Pages/WainwrightInfoPage.js";
import LandingPage from "./Pages/LandingPage.js";
import AppLayout from "./Pages/AppLayout.js";
import HomePage from "./Pages/HomePage.js";
import ProtectedRoute from "./Components/Authorization/ProtectedRoute.js";

function App() {
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
          <Route path="/login" element={<LoginPage />} />

          {/* App layout provides the Navbar */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />
            {/* <Route element={<SessionChecker />}> */}

            <Route
              path="/wainwrightinfo/:id"
              element={
                <ProtectedRoute>
                  <WainwrightInfoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/routeinfo/:id"
              element={
                <ProtectedRoute>
                  <RouteHomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/routeFinder"
              element={
                <ProtectedRoute>
                  <FinderMapPage key="routes" type="routes" />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/wainwrightFinder"
              element={
                <ProtectedRoute>
                  <FinderMapPage key="wainwrights" type="wainwrights" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logbook"
              element={
                <ProtectedRoute>
                  <Logbook />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
