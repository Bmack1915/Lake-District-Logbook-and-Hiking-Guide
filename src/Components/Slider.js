import React from "react";
import ReactSlider from "react-slider";

function Slider({ currentValue, setCurrentValue, min, max, children, unit }) {
  return (
    <div className="mb-5 flex items-center space-x-4 p-5">
      <ReactSlider
        className="customSlider w-64"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        defaultValue={0}
        value={currentValue}
        min={min}
        max={max}
        onChange={(currentValue) => setCurrentValue(currentValue)}
      />
      <div className="flex items-baseline">
        <p>
          {children} {currentValue} {unit}
        </p>
      </div>
    </div>
  );
}

export default Slider;
