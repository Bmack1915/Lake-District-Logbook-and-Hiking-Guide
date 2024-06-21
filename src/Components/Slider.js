import React, { useState } from "react";
import ReactSlider from "react-slider";

function Slider({ currentValue, setCurrentValue }) {
  return (
    <div>
      <ReactSlider
        className="customSlider"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        defaultValue={0}
        value={currentValue}
        min={289}
        max={1000}
        onChange={(currentValue) => setCurrentValue(currentValue)}
      ></ReactSlider>
      <p>Height in metres: {currentValue}</p>
    </div>
  );
}

export default Slider;
