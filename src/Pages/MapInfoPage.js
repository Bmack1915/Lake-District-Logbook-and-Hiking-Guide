import React, { useState } from "react";
import "../App.css";
import "../index.css";
import MainMap from "../Components/MapComponents/Map/MainMap";
import WainwrightFilters from "../Components/MapComponents/Filters/WainwrightFilters";
import RouteFilters from "../Components/MapComponents/Filters/RouteFilters";
import { Button } from "@nextui-org/react";
import RouteViewCard from "../Components/MapComponents/RouteViewCard";
import SuggestedRoutes from "../Components/MapComponents/SuggestedRoutes";
import FilterBar from "../Components/MapComponents/Filters/FilterBar";

function MapInfoPage({ initialState }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [type, setType] = useState(initialState);

  function handlePress() {
    setType((type) => !type);
  }

  return (
    <div>
      <FilterBar />
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="col-span-3 col-start-3 row-span-3 row-start-1">
          <MainMap type={type ? `routes` : `wainwrights`} />
        </div>
        <div className="col-span-2 col-start-1 row-start-1">
          {type ? (
            <RouteFilters handlePress={handlePress} />
          ) : (
            <WainwrightFilters handlePress={handlePress} />
          )}
        </div>
        <div className="col-span-2 row-span-2 row-start-2">
          <SuggestedRoutes />
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex min-h-screen">
      <div style={{ flex: 1 }}></div>
      <div
        style={{ backgroundImage: "url('./edge.jpg')" }}
        className="flex w-full max-w-lg flex-col justify-evenly bg-cover py-10"
      >
        <div className="mb-4 flex justify-center">
          <Button variant="contained" onClick={handlePress}>
            Toggle to {type ? "Routes" : "Wainwrights"}
          </Button>
        </div>

        {errorMsg && <p className="w-full text-center">{errorMsg}</p>}
      </div>
    </div>
  );
}

export default MapInfoPage;
