import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import "../index.css";
import { Loading } from "./Loading";
import { MapSummary } from "./MapSummary";
import MapFilters from "./MapFilters";
import { API_BASE_URL } from "./apiConfig.js";

function MapInfoPage() {
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
    <div className="flex justify-evenly py-10">
      <MapFilters
        wainwrights={wainwrights}
        setFilteredWainwrights={setFilteredWainwrights}
      />

      {!isLoading && wainwrights.length > 0 ? (
        <MapSummary wainwrights={filteredWainwrights} />
      ) : (
        <div>
          <Loading />
        </div>
      )}
      {errorMsg && <p className="w-full text-center">{errorMsg}</p>}
    </div>
  );
}

export default MapInfoPage;
