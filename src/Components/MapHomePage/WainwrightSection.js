import React from "react";
import { useSelector } from "react-redux";
import { TheMap } from "./Map";
import WainwrightFilters from "./WainwrightFilters";
import { Loading } from "../Utilities/Loading";

function WainwrightSection() {
  const wainwrights = useSelector((state) => state.wainwright.wainwrights);

  return (
    <div className="flex">
      <WainwrightFilters />
      <div className="m-3 overflow-hidden rounded-xl">
        {wainwrights.length > 0 ? <TheMap type="wainwright" /> : <Loading />}
      </div>
    </div>
  );
}

export default WainwrightSection;
