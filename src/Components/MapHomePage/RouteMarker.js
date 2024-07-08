import React, { useCallback } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RouteMarker({ r, setSelected, selected }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  //Each marker has a routeID, when you click one selected === this route ID, therefore this is true and the window shows.
  const infoWindowShown = selected === r.routeID;
  const navigate = useNavigate();
  const difficultyColours = {
    easy: "green",
    "Easy/Moderate": "green",
    Moderate: "yellow",
    "Moderate/Hard": "orange",
    Hard: "red",
    "Very Hard": "dark-red",
    Severe: "black",
  };

  const background = difficultyColours[r.difficulty];

  function handleMarkerClick() {
    setSelected(r.routeID);
  }

  const handleMoreInfoClick = () => {
    navigate("/logentry", { state: { r } });
  };

  const handleClose = useCallback(() => setSelected(null), []);

  const customContent = (
    <div>
      <h3 className="flex align-text-top font-bold">{r.name}</h3>
      <p>
        <button onClick={handleMoreInfoClick}>More Info</button>
      </p>
    </div>
  );

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={handleMarkerClick}
        position={{
          lat: r.latitude,
          lng: r.longitude,
        }}
        style={{ transform: "translate(50%, 100%)" }}
      >
        <Pin
          // src="/mountain.png"
          scale={1}
          style={{ opacity: 0.5 }}
          background={background}
          borderColor={"black"}
          glyphColor={background}
        />
      </AdvancedMarker>

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <button></button>
          {customContent}
        </InfoWindow>
      )}
    </>
  );
}

export default RouteMarker;
