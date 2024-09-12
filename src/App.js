import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchWainwrights } from "./redux/wainwrightSlice.js";
import { fetchRoutes } from "./redux/routeSlice.js";

import ProtectedRoute from "./Components/Authorization/ProtectedRoute.js";
import { Loading } from "./Components/Utilities/Loading.js";

import "./App.css";
import "./index.css";

// Lazy loading components
const LoginPage = React.lazy(() => import("./Pages/LoginPage.js"));
const MapPage = React.lazy(() => import("./Pages/MapPage.js"));
const RouteHomePage = React.lazy(() => import("./Pages/RoutePage.js"));
const Logbook = React.lazy(() => import("./Pages/LogbookPage.js"));
const WainwrightInfoPage = React.lazy(
  () => import("./Pages/WainwrightInfoPage.js"),
);
const AppLayout = React.lazy(() => import("./Pages/AppLayout.js"));
const HomePage = React.lazy(() => import("./Pages/HomePage.js"));

function App() {
  const dispatch = useDispatch();

  //Fetch all Wainwright and Route Data upon application mount
  useEffect(() => {
    dispatch(fetchWainwrights());
    dispatch(fetchRoutes());
    console.log("All data fetched");
  }, [dispatch]);

  return (
    <div className="font-inconsolata">
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* App layout provides the Navbar */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />

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
                    <MapPage key="routes" type="routes" />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wainwrightFinder"
                element={
                  <ProtectedRoute>
                    <MapPage key="wainwrights" type="wainwrights" />
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
        </Suspense>
      </Router>
      {/* Custom implementation of toast notifations */}
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
