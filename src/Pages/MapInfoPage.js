import React, { useState } from "react";
import "../App.css";
import "../index.css";
import WainwrightViewCard from "../Components/MapPageComponents/WainwrightViewCard";
import LEAFLETMAP from "../Components/MapPageComponents/LEAFLETMAP";
import WainwrightFilters from "../Components/MapPageComponents/WainwrightFilters";
import RouteFilters from "../Components/MapPageComponents/RouteFilters";
import { Button } from "@mui/material";
import RouteViewCard from "../Components/MapPageComponents/RouteViewCard";
import SuggestedRoutes from "../Components/MapPageComponents/SuggestedRoutes";

function MapInfoPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [type, setType] = useState(true);

  function handlePress() {
    setType((type) => !type);
  }

  return (
    <div className="flex min-h-screen">
      <div style={{ flex: 1 }}>
        {/* <LEAFLETMAP type={type ? `wainwrights` : `routes`} /> */}
        <SuggestedRoutes />
      </div>
      <div
        style={{ backgroundImage: "url('./edge.jpg')" }}
        className="flex w-full max-w-lg flex-col justify-evenly bg-cover py-10"
      >
        <div className="mb-4 flex justify-center">
          <Button variant="contained" onClick={handlePress}>
            Toggle to {type ? "Routes" : "Wainwrights"}
          </Button>
        </div>
        {type ? <WainwrightFilters /> : <RouteFilters />}

        {errorMsg && <p className="w-full text-center">{errorMsg}</p>}
      </div>
    </div>
  );
}

export default MapInfoPage;
