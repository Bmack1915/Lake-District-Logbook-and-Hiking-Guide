import React, { useCallback, useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";

function RouteMarker({ route, selectedRoute, setSelectedRoute }) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  //Each marker has a routeID, when you click one selected === this route ID, therefore this is true and the window shows.
  const infoWindowShown = selectedRoute?.routeID === route.routeID;
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

  const background = difficultyColours[route.difficulty];

  function handleMarkerClick() {
    setSelectedRoute(route);
  }

  const handleMoreInfoClick = () => {
    if (selectedRoute) {
      navigate(`/routeinfo/${route.routeID}`);
    }
  };

  const handleClose = () => {
    setSelectedRoute(null);
  };

  const customContent = (
    <div>
      <h3 className="flex align-text-top font-bold">{route.name}</h3>
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
          lat: route.latitude,
          lng: route.longitude,
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
          {customContent}
        </InfoWindow>
      )}
    </>
  );
}

export default RouteMarker;
