import "./App.css";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWainwrights } from "./redux/wainwrightSlice.js";
import { useEffect } from "react";
import { fetchRoutes } from "./redux/routeSlice.js";

import Login from "./Components/Authorization/Login.js";
import LogbookHome from "./Components/Logging/myLogBook.js";
import Navbar from "./Components/NavBar.js";
import MapInfoPageGlobal from "./Components/MapHomePage/MapInfoPageGlobal.js";
import RouteHomePage from "./Components/Logging/RouteHomePage.js";

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
          <Route path="/routeinfo" element={<RouteHomePage />} />
          <Route path="/" element={<MapInfoPageGlobal />} />
          <Route path="/logbook" element={<LogbookHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
