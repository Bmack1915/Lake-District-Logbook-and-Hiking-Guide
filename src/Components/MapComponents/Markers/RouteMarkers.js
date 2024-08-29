import { Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";
import timeConverter from "../../Utilities/timeConverter";

const RouteIcon = new L.Icon({
  iconUrl: "assets/pins/pinEasternUnComplete.png",
  iconSize: [30, 35],
  iconAnchor: [16, 30],
  popupAnchor: [0, -25],
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
              <div className="">
                <b>{r.name}</b>
                <p>{r.description}</p>
                <p>Estimated time {timeConverter(r.time)}</p>
              </div>
              <Button
                endContent={<IoMdSend />}
                // className="bg-lightblue"
                className="text-black bg-lightblue font-bold"
                onPress={() => handleNavigate(r)}
                size="sm"
              >
                Click for more info
              </Button>
            </Popup>
          </Marker>
        ))}
    </div>
  );
}

export default RouteMarkers;
