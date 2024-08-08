import { useEffect, useMemo, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserWainwrights } from "../../Utilities/useUserWainwrights";

function createWainwrightIcon(area, completed) {
  return new L.Icon({
    iconUrl: completed
      ? `assets/pins/pin${area}Complete.png`
      : `assets/pins/pin${area}Uncomplete.svg`,
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

  const id = useSelector((state) => state.user.id);
  const { userWainwrights } = useUserWainwrights(id);

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
        const completed = userWainwrights.map((uw) => uw.name).includes(w.name);
        console.log(completed);
        icons[w.area] = createWainwrightIcon(w.area, completed);
      }
    });
    return icons;
  }, [data, userWainwrights]);

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
