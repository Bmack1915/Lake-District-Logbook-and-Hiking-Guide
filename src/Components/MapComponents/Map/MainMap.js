import React, { useEffect, useRef } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapBaseLayer from "./MapBaseLayer";
import WainwrightMarkers from "../Markers/WainwrightMarkers";
import RouteMarkers from "../Markers/RouteMarkers";

export default function MainMap({ type }) {
  const markersRef = useRef([]);

  useEffect(() => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  }, [type]);

  return (
    <MapContainer
      center={[54.5522, -3.1038704]}
      zoom={10.5}
      style={{ height: "80vh", borderRadius: "5vh" }}
    >
      <MapBaseLayer />
      {type === "wainwrights" && <WainwrightMarkers />}
      {type === "routes" && <RouteMarkers />}
    </MapContainer>
  );
}

// <a href="https://www.flaticon.com/free-icons/walk" title="walk icons">
//   Walk icons created by Freepik - Flaticon
// </a>;

// <a href="https://www.flaticon.com/free-icons/hiking" title="hiking icons">
//   Hiking icons created by IYIKON - Flaticon
// </a>;

{
  /* <a
  href="https://www.flaticon.com/free-icons/placeholder"
  title="placeholder icons"
>
  Placeholder icons created by Freepik - Flaticon
</a>;

<a href="https://www.flaticon.com/free-icons/map-pin" title="map pin icons">
  Map pin icons created by Md Tanvirul Haque - Flaticon
</a>; */
}
