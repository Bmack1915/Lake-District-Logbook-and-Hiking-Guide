import React, { useEffect, useRef } from "react";
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

  //If the map type changes, remove the markers so new ones can be implemented, i.e. for routes or Wainwrights
  useEffect(() => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  }, [type]);

  //Creation of map instance
  return (
    <MapContainer
      center={[54.5522, -3.1038704]}
      zoom={10}
      maxZoom={15}
      minZoom={9}
      style={{ height: "75vh", borderRadius: "5vh" }}
    >
      <MapBaseLayer />
      {/* Reuse map, just apply different markers */}
      {type === "wainwrights" && <WainwrightMarkers />}
      {type === "routes" && <RouteMarkers />}
      {/* Filter button on the map that opens and closes the filter sidebar */}
      <Control prepend position="topleft">
        <Button className="bg-white" onPress={toggleSidebar}>
          <FiFilter size={24} />
        </Button>
      </Control>
    </MapContainer>
  );
}
