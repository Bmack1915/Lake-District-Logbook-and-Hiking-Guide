import { useEffect, useMemo, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function createWainwrightIcon(area) {
  return new L.Icon({
    iconUrl: `assets/mountain${area}.png`,
    iconSize: [30, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
}

function WainwrightMarkers() {
  const navigate = useNavigate();
  const filteredWainwrights = useSelector(
    (state) => state.wainwright.filteredWainwrights,
  );
  const wainwrights = useSelector((state) => state.wainwright.wainwrights);
  const [data, setData] = useState(wainwrights);

  useEffect(() => {
    if (filteredWainwrights.length > 0) {
      setData(filteredWainwrights);
    } else {
      setData(wainwrights);
    }
  }, [filteredWainwrights, wainwrights]);

  function handleNavigate(w) {
    navigate(`/wainwrightinfo/${w.wainwrightID}`);
  }

  //Create array of icons, one for each area. Icon url matches a image in the public folder.
  const wainwrightIcons = useMemo(() => {
    const icons = {};
    data.forEach((w) => {
      if (!icons[w.area]) {
        icons[w.area] = createWainwrightIcon(w.area);
      }
    });
    return icons;
  }, [data]);

  return (
    <div>
      {data.length > 0 &&
        data.map((w) => (
          <Marker
            key={w.id}
            position={[w.latitude, w.longitude]}
            icon={wainwrightIcons[w.area]}
          >
            <Popup>
              <b>{w.name}</b>
              <p>
                {w.latitude},{w.longitude}
              </p>
              <Button
                onClick={() => handleNavigate(w)}
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

export default WainwrightMarkers;
