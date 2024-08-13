import { Button } from "@mui/material";
import { Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { useEffect, useState } from "react";

const RouteIcon = new L.Icon({
  iconUrl: "assets/hiking.png",
  iconSize: [24, 35],
  iconAnchor: [16, 30],
  popupAnchor: [-3, -30],
});

function RouteMarkers() {
  const navigate = useNavigate();
  const filteredRoutes = useSelector((state) => state.route.filteredRoutes);
  const routes = useSelector((state) => state.route.routes);
  const [data, setData] = useState(routes);

  useEffect(() => {
    if (filteredRoutes.length > 0) {
      setData(filteredRoutes);
    } else {
      setData(routes);
    }
  }, [filteredRoutes, routes]);

  function handleNavigate(r) {
    navigate(`/routeinfo/${r.routeID}`);
  }

  return (
    <div>
      {data?.length > 0 &&
        data.map((r) => (
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
