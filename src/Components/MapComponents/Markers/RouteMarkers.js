import { Button } from "@mui/material";
import { Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

const RouteIcon = new L.Icon({
  iconUrl: "assets/hiking.png",
  iconSize: [24, 35],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

function RouteMarkers() {
  const navigate = useNavigate();
  const filteredRoutes = useSelector((state) => state.route.filteredRoutes);

  function handleNavigate(r) {
    navigate(`/routeinfo/${r.routeID}`);
  }

  return (
    <div>
      {filteredRoutes.length > 0 &&
        filteredRoutes.map((r) => (
          <Marker
            key={r.id}
            position={[r.latitude, r.longitude]}
            icon={RouteIcon}
          >
            <Popup>
              <b>{r.name}</b>
              <p>{r.description}</p>
              <Button
                onClick={() => handleNavigate(r)}
                variant="contained"
                size="small"
              >
                Click for more info/Logging!
              </Button>
            </Popup>
          </Marker>
        ))}
    </div>
  );
}

export default RouteMarkers;
