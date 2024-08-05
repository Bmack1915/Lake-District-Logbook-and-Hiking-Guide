import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

var RouteIcon = L.Icon.extend({
  options: {
    shadowUrl: "leaf-shadow.png",
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  },
});

var WainwrightIcon = L.Icon.extend({
  options: {
    shadowUrl: "leaf-shadow.png",
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  },
});

var wainwrightIcon = new WainwrightIcon({ iconUrl: "logo192.png" });

export default function WainwrightsLeafletMap({ wainwrights }) {
  useEffect(() => {
    //Map object with center and default zoom
    const map = L.map("map").setView([54.460861, -3.08875], 10);
    //Tiles are what make up the map, coming from open source places to form a full map.
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    //Way to add a marker.
    function addMarkers() {
      if (wainwrights.length > 0) {
        wainwrights.map((w) => {
          const marker = L.marker([w.latitude, w.longitude], {
            icon: wainwrightIcon,
          }).addTo(map);
          marker.bindPopup(`<b>${w.name}</b><br>I am a popup.`);
        });
      }
    }

    //How to use on handlers, you could do anything here, e.g. set zoom etc.
    var popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }

    map.on("click", onMapClick);

    addMarkers();
    return () => {
      map.remove();
    };
  }, [wainwrights]);

  return <div id="map" style={{ height: "100vh" }}></div>;
}
