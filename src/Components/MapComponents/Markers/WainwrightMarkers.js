import { Marker, Popup } from "react-leaflet";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Utilities/Loading";
import useCreateMarkers from "../../Utilities/useCreateMarkers";

function WainwrightMarkers() {
  const navigate = useNavigate();

  function handleNavigate(w) {
    navigate(`/wainwrightinfo/${w.wainwrightID}`);
  }

  const { data, wainwrightIcons } = useCreateMarkers();

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
