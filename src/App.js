import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { API_BASE_URL, API_KEY } from "./apiConfig";
import "./App.css";

function App() {
  const [errorMsg, setErrorMsg] = useState("");
  const [wainwrights, setWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Wainwrights`);
        setWainwrights(res.data);
        console.log(wainwrights);
      } catch (err) {
        setErrorMsg("Error found");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Test</p>

      {!isLoading && wainwrights.length > 0 ? (
        <MapSummary wainwrights={wainwrights} />
      ) : (
        <Loading />
      )}
      {errorMsg && <p>{errorMsg}</p>}
      <p>Map should be here</p>
    </div>
  );
}

function Loading() {
  return <p>🕣 Page is loading...</p>;
}
function MapSummary({ wainwrights }) {
  const [selected, setSelected] = useState(null);

  const containerStyle = {
    width: "500px",
    height: "500px",
  };

  function handleMapClick() {
    setSelected(null);
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        onClick={handleMapClick}
        mapId={"2bf56b659e5bf4cc"}
        style={containerStyle}
        defaultCenter={{
          lat: wainwrights[0].latitude,
          lng: wainwrights[0].longitude,
        }}
        defaultZoom={9}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {wainwrights.map((w) => (
          <MarkerWithInfoWindow
            setSelected={setSelected}
            w={w}
            key={w.wainwrightID}
            selected={selected}
          />
        ))}
      </Map>
    </APIProvider>
  );
}

const MarkerWithInfoWindow = ({ w, setSelected, selected }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const infoWindowShown = selected === w.wainwrightID;

  const areaColors = {
    Southern: "red",
    Northern: "blue",
    Eastern: "green",
    Western: "orange",
    Central: "purple",
  };

  function getBackgroundColour(area) {
    return areaColors[`${area} `];
  }

  const background = getBackgroundColour(w.area + " ");

  function handleMarkerClick() {
    setSelected(w.wainwrightID);
  }

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={handleMarkerClick}
        position={{
          lat: w.latitude,
          lng: w.longitude,
        }}
      >
        <Pin
          background={background}
          borderColor={"black"}
          glyphColor={"black"}
        ></Pin>
      </AdvancedMarker>

      {infoWindowShown && (
        <InfoWindow key={w.wainwrightID} anchor={marker} onClose={handleClose}>
          <h2>{w.name}</h2>
          <p>Click here to find out more!</p>
        </InfoWindow>
      )}
    </>
  );
};

export default App;
