import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../index.css";
import { Loading } from "../Utilities/Loading.js";
import { TheMap } from "./Map.js";
import RouteFilters from "./RouteFilters.js";
import WainwrightFilters from "./WainwrightFilters.js";
import ToggleButton from "../Utilities/ToggleSlider.js";
import WainwrightViewCard from "./WainwrightViewCard.js";

function MapInfoPage({
  wainwrights,
  setWainwrights,
  routes,
  setRoutes,
  isLoading,
}) {
  const [errorMsg, setErrorMsg] = useState("");
  const [filteredWainwrights, setFilteredWainwrights] = useState(wainwrights);
  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [filterToggle, setFilterToggle] = useState(true);

  return (
    <div>
      <div
        style={{ backgroundImage: "url('./edge.jpg')" }}
        className="min-5-screen min-5-screen flex justify-evenly bg-cover py-10"
      >
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
                <TheMap data={filteredWainwrights} type="wainwright" />
              ) : (
                <div>
                  <Loading />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <RouteFilters
              routes={routes}
              setFilteredRoutes={setFilteredRoutes}
            />
            <div className="m-3 overflow-hidden rounded-xl">
              {!isLoading && routes.length > 0 ? (
                <TheMap data={filteredRoutes} type="route" />
              ) : (
                <div>
                  <Loading />
                </div>
              )}
            </div>
          </>
        )}

        {errorMsg && <p className="w-full text-center">{errorMsg}</p>}
      </div>

      <div>
        {filteredWainwrights.map((w) => (
          <WainwrightViewCard w={w} />
        ))}
      </div>
    </div>
  );
}

export default MapInfoPage;
