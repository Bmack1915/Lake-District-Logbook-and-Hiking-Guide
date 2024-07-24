import React, { useState } from "react";
import "../App.css";
import "../index.css";
import ToggleButton from "../Components/ToggleSlider";
import WainwrightSection from "../Components/MapPageComponents/WainwrightSection";
import RouteSection from "../Components/MapPageComponents/RouteSection";
import WainwrightViewCard from "../Components/MapPageComponents/WainwrightViewCard";

function MapInfoPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [filterToggle, setFilterToggle] = useState(false);

  return (
    <div>
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

export default MapInfoPage;
