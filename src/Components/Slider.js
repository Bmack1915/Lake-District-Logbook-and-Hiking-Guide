import React, { Children, useState } from "react";
import ReactSlider from "react-slider";

function Slider({ currentValue, setCurrentValue, min, max, children, unit }) {
  return (
    <div>
      <ReactSlider
        className="customSlider"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        defaultValue={0}
        value={currentValue}
        min={min}
        max={max}
        onChange={(currentValue) => setCurrentValue(currentValue)}
      ></ReactSlider>
      <p>
        {children} {currentValue} {unit}
      </p>
    </div>
  );
}

export default Slider;
