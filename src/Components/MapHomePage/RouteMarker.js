import React, { useCallback } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

function RouteMarker({ r, setSelected, selected }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const infoWindowShown = selected === r.routeID;

  function handleMarkerClick() {
    setSelected(r.routeID);
  }

  const handleClose = useCallback(() => setSelected(null), []);

  const customContent = (
    <div>
      <h3>{r.name}</h3>``
      {/* <p>Area: {w.area}</p> */}
      <p>
        <a
          href={`https://example.com/more-info/${w.wainwrightID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to find out more!
        </a>
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
          scale={0.5}
          // style={{ opacity: 0.5 }}
          //   background={background}
          borderColor={"black"}
          //   glyphColor={background}
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
