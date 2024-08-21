import { MapContainer, Marker } from "react-leaflet";
import L from "leaflet";
import { TileLayer } from "react-leaflet";

const WainwrightIcon = new L.Icon({
  iconUrl: "/assets/pins/pinEasternComplete.png",
  iconSize: [50, 50],
  iconAnchor: [22, 53],
  popupAnchor: [-3, -76],
});

function WainwrightMap({ wainwright }) {
  return (
    <MapContainer
      center={[wainwright.latitude, wainwright.longitude]}
      zoom={13}
      style={{ height: "60vh", borderRadius: "5vh" }}
    >
      <TileLayer
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        maxZoom={17}
        attribution='Map data: &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
      />

      <Marker
        key={wainwright.wainwrightID}
        position={[wainwright.latitude, wainwright.longitude]}
        icon={WainwrightIcon}
      />
    </MapContainer>
  );
}

export default WainwrightMap;
