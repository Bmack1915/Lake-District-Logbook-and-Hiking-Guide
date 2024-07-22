import React, { useState } from "react";
import "../../App.css";
import "../../index.css";
import CompletedWainwrights from "./CompletedWainwrights";
import ToggleButton from "../ToggleSlider";
import WainwrightSection from "./WainwrightSection";
import RouteSection from "./RouteSection";
import WainwrightViewCard from "./WainwrightViewCard";

function MapInfoPageGlobal() {
  const [errorMsg, setErrorMsg] = useState("");
  const [filterToggle, setFilterToggle] = useState(true);

  return (
    <div>
      <CompletedWainwrights />
      <div
        style={{ backgroundImage: "url('./edge.jpg')" }}
        className="min-5-screen min-5-screen flex justify-evenly bg-cover py-10"
      >
        <ToggleButton onToggle={filterToggle} setOnToggle={setFilterToggle}>
          {filterToggle ? "Wainwright Finder" : "Route Finder"}
        </ToggleButton>

        {filterToggle ? <WainwrightSection /> : <RouteSection />}
        {errorMsg && <p className="w-full text-center">{errorMsg}</p>}
      </div>
      <WainwrightViewCard />
    </div>
  );
}

export default MapInfoPageGlobal;
