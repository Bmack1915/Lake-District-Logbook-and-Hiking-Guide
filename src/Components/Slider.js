import React from "react";
import ReactSlider from "react-slider";

function Slider({ currentValue, setCurrentValue, children, min, max, unit }) {
  return (
    <div className="mb-5 flex items-center space-x-4 p-5">
      <ReactSlider
        className="customSlider w-64"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        defaultValue={[min, max]}
        value={currentValue}
        min={min}
        max={max}
        onChange={(values) => setCurrentValue(values)}
        withTracks={true}
      />
      <div className="flex items-baseline">
        <p>
          {children} {currentValue[0]} {unit} - {currentValue[1]} {unit}
        </p>
      </div>
    </div>
  );
}

export default Slider;
