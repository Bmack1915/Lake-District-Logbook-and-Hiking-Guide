import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { API_KEY } from "../Utilities/apiConfig";
import WainwrightMarker from "./WainwrightMarker";
import RouteMarker from "./RouteMarker";
import { useSelector } from "react-redux";

export function TheMap({ type }) {
  const filteredRoutes = useSelector((state) => state.route.filteredRoutes);
  const filteredWainwrights = useSelector(
    (state) => state.wainwright.filteredWainwrights,
  );
  const [selectedRoute, setSelectedRoute] = useState();

  const containerStyle = {
    width: "700px",
    height: "700px",
  };

  function handleMapClick() {
    setSelectedRoute(null);
  }

  function renderMarkers() {
    if (type === "wainwright") {
      return filteredWainwrights.map((w) => (
        <WainwrightMarker
          // setSelectedRoute={setSelectedRoute}
          w={w}
          key={w.wainwrightID}
          // selectedRoute={selectedRoute}
        />
      ));
    } else {
      return filteredRoutes.map((route) => (
        <RouteMarker
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          route={route}
          key={route.routeID}
        />
      ));
    }
  }
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        onClick={handleMapClick}
        mapId={"2bf56b659e5bf4cc"}
        style={containerStyle}
        defaultCenter={{
          lat: 54.460861,
          lng: -3.08875,
        }}
        mapTypeId="satellite"
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {renderMarkers()}
      </Map>
    </APIProvider>
  );
}
