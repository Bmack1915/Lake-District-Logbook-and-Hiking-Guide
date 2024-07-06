import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import "../../index.css";
import { Loading } from "../Loading.js";
import { MapSummary } from "./MapSummary.js";
import RouteFilters from "./RouteFilters.js";
import { API_BASE_URL } from "../apiConfig.js";
import WainwrightFilters from "./WainwrightFilters.js";
import ToggleButton from "../ToggleSlider.js";

function MapInfoPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [wainwrights, setWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredWainwrights, setFilteredWainwrights] = useState(wainwrights);
  const [filterToggle, setFilterToggle] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Wainwrights`);
        console.log(res);
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
      <ToggleButton onToggle={filterToggle} setOnToggle={setFilterToggle}>
        {filterToggle ? "Wainwright Finder" : "Route Finder"}
      </ToggleButton>

      {filterToggle ? (
        <>
          <WainwrightFilters
            wainwrights={wainwrights}
            setFilteredWainwrights={setFilteredWainwrights}
          />
          <div className="m-3 overflow-hidden rounded-xl">
            {!isLoading && wainwrights.length > 0 ? (
              <MapSummary wainwrights={filteredWainwrights} />
            ) : (
              <div>
                <Loading />
              </div>
            )}
          </div>
        </>
      ) : null}
      {/* (
        <RouteFilters />
      )} */}

      {errorMsg && <p className="w-full text-center">{errorMsg}</p>}
    </div>
  );
}

export default MapInfoPage;
