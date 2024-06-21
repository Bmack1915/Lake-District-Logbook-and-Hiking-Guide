import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";
import { Loading } from "./Components/Loading";
import { MapSummary } from "./Components/MapSummary";
import MapFilters from "./Components/MapFilters";
import { API_BASE_URL } from "./Components/apiConfig.js";

function App() {
  <MapPage></MapPage>;
  const [errorMsg, setErrorMsg] = useState("");
  const [wainwrights, setWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredWainwrights, setFilteredWainwrights] = useState(wainwrights);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Wainwrights`);
        setWainwrights(res.data);
        setFilteredWainwrights(res.data);
      } catch (err) {
        setErrorMsg("Error found");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MapFilters
        wainwrights={wainwrights}
        setFilteredWainwrights={setFilteredWainwrights}
      />

      {!isLoading && wainwrights.length > 0 ? (
        <MapSummary
          wainwrights={filteredWainwrights}
          //   filteredWainwrights.length > 0 ? filteredWainwrights : wainwrights
          // }
        />
      ) : (
        <Loading />
      )}
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
}

export default App;
