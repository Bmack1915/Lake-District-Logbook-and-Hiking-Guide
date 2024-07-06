import React, { useEffect, useState } from "react";
import Slider from "../Slider";

function RouteFilters({ setFilteredWainwrights, wainwrights }) {
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentHeight, setCurrentHeight] = useState([100, 1100]);
  const [currentLength, setCurrentLength] = useState([0, 37]);
  const [currentDifficulty, setCurrentDifficulty] = useState();

  useEffect(() => {
    function checkFilter() {
      let filtered = wainwrights;

      filtered = filtered.filter((w) => w.heightM < currentHeight);

      if (selectedArea) {
        filtered = filtered.filter((w) => w.area === selectedArea);
      }

      setFilteredWainwrights(filtered);
    }

    checkFilter();
  }, [selectedArea, currentHeight]);

  function HandleReset() {
    setSelectedArea(null);
    setFilteredWainwrights(wainwrights);
    setCurrentHeight([100, 1100]);
    setCurrentLength([0, 37]);
  }

  const areas = [
    "Southern",
    "Northern",
    "Eastern",
    "Western",
    "Central",
    "Far Eastern",
    "North Western",
  ];
  return (
    //Create a radio button for each area, and set the selected area to the selectedArea state via controlled inputs.
    <div className="spacing-5 m-3 overflow-hidden rounded-xl border-8 border-double p-3">
      <h1 className="flex justify-center p-5 text-xl font-bold">
        Find your route!
      </h1>
      <div className="flex flex-wrap">
        {areas.map((area) => (
          <div key={area} className="mb-2 mr-4 flex items-center font-bold">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="areaFilter"
                value={area}
                checked={selectedArea === area}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="mr-2"
              />
              {area}
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-evenly">
        <div className="mb-10 flex flex-col justify-evenly py-4">
          <Slider
            currentValue={currentHeight}
            setCurrentValue={setCurrentHeight}
            unit="metres"
            min={100}
            max={1100}
          >
            Height
          </Slider>

          <Slider
            currentValue={currentLength}
            setCurrentValue={setCurrentLength}
            unit="km"
            min={0}
            max={37}
          >
            Length of walk
          </Slider>
        </div>

        <div className="flex justify-center">
          <button
            onClick={HandleReset}
            className="mb-2 me-2 flex inline-flex w-full justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default RouteFilters;
