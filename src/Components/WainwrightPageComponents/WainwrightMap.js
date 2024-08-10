import { MapContainer, Marker } from "react-leaflet";
import MapBaseLayer from "../MapComponents/Map/MapBaseLayer";
import L from "leaflet";

const WainwrightIcon = new L.Icon({
  iconUrl: "/assets/mountainNoBg.png",
  iconSize: [24, 35],
  iconAnchor: [16, 30],
  popupAnchor: [-3, -76],
});

function WainwrightMap({ wainwright }) {
  return (
    <MapContainer
      center={[wainwright.latitude, wainwright.longitude]}
      zoom={13}
      style={{ height: "50vh", borderRadius: "5vh" }}
    >
      <MapBaseLayer />
      <Marker
        key={wainwright.wainwrightID}
        position={[wainwright.latitude, wainwright.longitude]}
        icon={WainwrightIcon}
      />
    </MapContainer>
  );
}

export default WainwrightMap;
