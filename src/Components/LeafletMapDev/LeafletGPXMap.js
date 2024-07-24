import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-gpx";

export default function LeafletGPXMap({ url }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([54.460861, -3.08875], 10);

    // Add tile layer
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Save the map instance to state
    setMap(map);

    // Cleanup function to remove the map instance on component unmount
    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      // Function to add GPX files
      function addGPX(url) {
        var gpx = new L.GPX(url, {
          async: true,
          marker_options: {
            startIconUrl: "./mountain.png",
            endIconUrl: "./edge.png",
            shadowUrl: "images/pin-shadow.png",
          },
        })
          .on("loaded", function (e) {
            map.fitBounds(e.target.getBounds());
          })
          .on("error", function (e) {
            console.error("Failed to load GPX file:", e);
          })
          .addTo(map);
      }

      // Example GPX file URL
      // const gpxFileUrl = `${process.env.PUBLIC_URL}/Walking Britain Walk_1023.gpx`;
      addGPX(url);
    }
  }, [map, url]);

  return <div id="map" className="p-4" style={{ height: "100vh" }}></div>;
}
