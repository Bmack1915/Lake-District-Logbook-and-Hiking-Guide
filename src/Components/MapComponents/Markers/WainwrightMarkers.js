import { useEffect, useMemo, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserWainwrights } from "../../Utilities/useUserWainwrights";
import { Loading } from "../../Utilities/Loading";

function createWainwrightIcon(area, completed) {
  const iconUrl = completed
    ? `assets/pins/pin${area}Complete.png`
    : `assets/pins/pin${area}Uncomplete.svg`;

  return new L.Icon({
    iconUrl,
    iconSize: [30, 35],
    iconAnchor: [16, 30],
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

  //Used to check which are complete
  const id = useSelector((state) => state.user.id);
  const { userWainwrights } = useUserWainwrights(id);
  console.log("userwainys", userWainwrights);

  //If no filtering on, the data set is just the original Wainwrights.
  useEffect(() => {
    if (filteredWainwrights.length > 0) {
      setData(filteredWainwrights);
    } else if (wainwrights.length > 0) {
      setData(wainwrights);
    }
  }, [filteredWainwrights, wainwrights]);

  function handleNavigate(w) {
    navigate(`/wainwrightinfo/${w.wainwrightID}`);
  }

  // Now mapping over all the data sets, all heights, etc., create an icon for each data point. If completed, this icon will be a colored one.
  const wainwrightIcons = useMemo(() => {
    const icons = {};

    if (userWainwrights && userWainwrights.length > 0) {
      data.forEach((w) => {
        // If a list of user wainwright names includes the current name of the filtered wainwright, set completed to true
        const completed = userWainwrights.map((uw) => uw.name).includes(w.name);
        icons[w.wainwrightID] = createWainwrightIcon(w.area, completed);
      });
    } else {
      // Default icons without checking completion status if userWainwrights is not available
      data.forEach((w) => {
        icons[w.wainwrightID] = createWainwrightIcon(w.area, false);
      });
    }

    return icons;
  }, [data, userWainwrights]);

  if (data)
    return (
      <div>
        {data.length > 0 &&
          data.map((w) => (
            <Marker
              key={w.wainwrightID}
              position={[w.latitude, w.longitude]}
              icon={wainwrightIcons[w.wainwrightID]}
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
  else {
    return <Loading />;
  }
}

export default WainwrightMarkers;
