import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { API_KEY } from "../Utilities/apiConfig";
import WainwrightMarker from "./WainwrightMarker";
import RouteMarker from "./RouteMarker";

export function MapSummary({ data, type }) {
  const [selected, setSelected] = useState(null);

  const containerStyle = {
    width: "700px",
    height: "700px",
  };

  function handleMapClick() {
    setSelected(null);
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        onClick={handleMapClick}
        mapId={"2bf56b659e5bf4cc"}
        style={containerStyle}
        defaultCenter={{
          lat: 54.460861,
          lng: -3.08875,
        }}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {type === "wainwright"
          ? data.map((w) => (
              <WainwrightMarker
                setSelected={setSelected}
                w={w}
                key={w.wainwrightID}
                selected={selected}
              />
            ))
          : data.map((r) => (
              <RouteMarker
                setSelected={setSelected}
                r={r}
                key={r.routeID}
                selected={selected}
              />
            ))}
      </Map>
    </APIProvider>
  );
}
