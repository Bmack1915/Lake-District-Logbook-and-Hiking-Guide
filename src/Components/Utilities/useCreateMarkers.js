import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import L from "leaflet";

function createWainwrightIcon(area, completed) {
  const iconUrl = completed
    ? `assets/pins/pin${area}Complete.png`
    : `assets/pins/pin${area}Uncomplete.png
    `;

  return new L.Icon({
    iconUrl,
    iconSize: [30, 35],
    iconAnchor: [16, 30],
    popupAnchor: [0, -25],
  });
}

function useCreateMarkers() {
  const filteredWainwrights = useSelector(
    (state) => state.wainwright.filteredWainwrights,
  );
  const wainwrights = useSelector((state) => state.wainwright.wainwrights);

  const userId = useSelector((state) => state.user.id);

  const userWainwrights = useSelector((state) => state.user.userWainwrights);

  //By default show all wainwright markers
  const [data, setData] = useState(wainwrights);

  //If no filtering on, the data set to create markers from is just the original Wainwrights.
  useEffect(() => {
    if (filteredWainwrights.length > 0) {
      setData(filteredWainwrights);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredWainwrights]);

  // Now mapping over all the data sets, all heights, etc., create an icon for each data point. If completed, this icon will be a colored one.
  const wainwrightIcons = useMemo(() => {
    const icons = {};

    if (userWainwrights && userWainwrights.length > 0) {
      data.forEach((w) => {
        // If a list of user wainwright names includes the current name of the filtered wainwright, set completed to true
        const completed = userWainwrights
          .map((uw) => uw.wainwright.name)
          .includes(w.name);
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

  return { wainwrightIcons, data };
}

export default useCreateMarkers;
