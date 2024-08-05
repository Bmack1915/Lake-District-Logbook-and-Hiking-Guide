import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";
import L from "leaflet";
import MapBaseLayer from "../MapComponents/Map/MapBaseLayer";

function GPXLayer({ url }) {
  const map = useMap();

  useEffect(() => {
    const gpx = new L.GPX(url, {
      async: true,
      marker_options: {
        startIconUrl: "/assets/greenPin.png", // Make sure this path is correct
        endIconUrl: "/assets/redPin.png", // Make sure this path is correct
        shadowUrl: null,
      },
    })
      .on("loaded", function (e) {
        map.fitBounds(e.target.getBounds());
      })
      .on("error", function (e) {
        console.error("Failed to load GPX file:", e);
      })
      .addTo(map);

    // Cleanup function to remove GPX layer on component unmount
    return () => {
      map.removeLayer(gpx);
    };
  }, [map, url]);

  return null;
}

export default function RouteMap({ url }) {
  return (
    <MapContainer
      center={[54.460861, -3.08875]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <MapBaseLayer />
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <GPXLayer url={url} />
    </MapContainer>
  );
}
