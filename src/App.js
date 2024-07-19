import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchWainwrights } from "./redux/wainwrightSlice.js";
import { useEffect } from "react";
import { fetchRoutes } from "./redux/routeSlice.js";
import Login from "./Components/Authorization/Login.js";
import LogbookHome from "./Components/Logging/myLogBook.js";
import LogEntry from "./Components/Logging/LogEntry.js";
import Navbar from "./Components/NavBar.js";
import MapInfoPageGlobal from "./Components/MapHomePage/MapInfoPageGlobal.js";
import RouteInfo from "./Components/Logging/RouteInfo.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWainwrights());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  return (
    <div>
      {/* <WainwrightsLeafletMap wainwrights={wainwrights}></WainwrightsLeafletMap> */}
      {/* <LeafletGPXMap></LeafletGPXMap> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/routeinfo" element={<RouteInfo />} />
          <Route path="/" element={<MapInfoPageGlobal />} />
          <Route path="/logbook" element={<LogbookHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
