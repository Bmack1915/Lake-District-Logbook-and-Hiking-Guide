import React, { useEffect, useState } from "react";
import Slider from "./Slider";

function MapFilters({ setFilteredWainwrights, wainwrights }) {
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentHeight, setCurrentHeight] = useState(1000);
  const [currentLength, setCurrentLength] = useState(0);
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
    setCurrentHeight(1000);
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
    <div>
      {areas.map((area) => (
        <ul>
          <label key={area}>
            <input
              type="radio"
              name="areaFilter"
              value={area}
              onChange={(e) => setSelectedArea(e.target.value)}
            />
            {area}
          </label>
        </ul>
      ))}

      <div>
        <Slider
          currentValue={currentHeight}
          setCurrentValue={setCurrentHeight}
          min={289}
          max={1000}
          unit="metres"
        >
          Height
        </Slider>

        <Slider
          currentValue={currentLength}
          setCurrentValue={setCurrentLength}
          min={5}
          max={40}
          unit="km"
        >
          Length of walk
        </Slider>
        <button onClick={HandleReset}>Reset</button>
      </div>
    </div>
  );
}

export default MapFilters;

// function ToggleButton() {
//   const [isToggled, setIsToggled] = useState(true);
//   return (
//     <div className="toggle-container">
//       <label className="switch">
//         <input
//           type="checkbox"
//           checked={isToggled}
//           onChange={() => setIsToggled(!isToggled)}
//         ></input>
//         <span className="slider round"></span>
//       </label>
//       <span>Completed</span>
//     </div>
//   );
// }
