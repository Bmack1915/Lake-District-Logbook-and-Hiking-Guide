import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";
import L from "leaflet";

function GPXLayer({ url }) {
  const map = useMap();

  useEffect(() => {
    const gpx = new L.GPX(url, {
      async: true,
      marker_options: {
        startIconUrl: "/assets/pins/greenPin.png", // Make sure this path is correct
        endIconUrl: "/assets/pins/redPin.png", // Make sure this path is correct
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
      maxZoom={15}
      minZoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        maxZoom={17}
        attribution='Map data: &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
      />
      <GPXLayer url={url} />
    </MapContainer>
  );
}
