import React, { useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapBaseLayer from "./MapBaseLayer";
import WainwrightMarkers from "../Markers/WainwrightMarkers";
import RouteMarkers from "../Markers/RouteMarkers";
import { FiFilter } from "react-icons/fi";
import Control from "react-leaflet-custom-control";
import { Button } from "@nextui-org/react";

export default function MapView({ type, toggleSidebar }) {
  const markersRef = useRef([]);

  useEffect(() => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  }, [type]);

  return (
    <MapContainer
      center={[54.5522, -3.1038704]}
      zoom={9.5}
      maxZoom={15}
      minZoom={9}
      style={{ height: "75vh", borderRadius: "5vh" }}
    >
      <MapBaseLayer />
      {type === "wainwrights" && <WainwrightMarkers />}
      {type === "routes" && <RouteMarkers />}
      <Control prepend position="topleft">
        <Button className="bg-white" onPress={toggleSidebar}>
          <FiFilter size={24} />
        </Button>
      </Control>
    </MapContainer>
  );
}
