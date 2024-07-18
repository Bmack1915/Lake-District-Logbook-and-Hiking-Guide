import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import MapInfoPage from "./Components/MapHomePage/MapInfoPage.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar.js";
import Login from "./Components/Authorization/Login.js";
import LogbookHome from "./Components/Logbook/LogbookHome.js";
import { API_BASE_URL } from "./Components/Utilities/apiConfig.js";
import axios from "axios";
import LogEntry from "./Components/Logbook/LogEntry.js";

function App() {
  const [wainwrights, setWainwrights] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //Use Effect to load data
  useEffect(() => {
    setIsLoading(true);
    const fetchWainwrightData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Wainwrights`);
        setWainwrights(res.data.$values);
        //setFilteredWainwrights(res.data);
      } catch (err) {
        setErrorMsg("Error found");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRouteData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Routes`);
        setRoutes(res.data.$values);
      } catch (err) {
        setErrorMsg("Error found");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRouteData();
    fetchWainwrightData();
  }, []);

  return (
    <div>
      {/* <WainwrightsLeafletMap wainwrights={wainwrights}></WainwrightsLeafletMap> */}
      {/* <LeafletGPXMap></LeafletGPXMap> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logentry" element={<LogEntry />} />
          <Route
            path="/"
            element={
              <MapInfoPage
                wainwrights={wainwrights}
                setWainwrights={setWainwrights}
                isLoading={isLoading}
                routes={routes}
                setRoutes={setRoutes}
              />
            }
          />
          <Route path="/logbook" element={<LogbookHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
