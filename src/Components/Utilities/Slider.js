import React from "react";
import ReactSlider from "react-slider";

function Slider({ currentValue, setCurrentValue, children, min, max, unit }) {
  return (
    <div className="flex flex-col items-center space-x-4 p-2">
      <h2 className="font-inconsolata font-bold">{children}</h2>
      <ReactSlider
        className="customSlider w-48"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        defaultValue={[min, max]}
        value={currentValue}
        min={min}
        max={max}
        onChange={(values) => setCurrentValue(values)}
        withTracks={true}
      />
      <p className="font-inconsolata">
        {currentValue[0]} {unit} - {currentValue[1]} {unit}
      </p>
    </div>
  );
}

export default Slider;
