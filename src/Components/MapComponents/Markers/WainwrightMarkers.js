import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Utilities/Loading";
import useCreateMarkers from "../../Utilities/useCreateMarkers";
import { IoMdSend } from "react-icons/io";
import { Button } from "@nextui-org/react";

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
                <div>
                  <b>{w.name}</b>

                  <p>{w.description}</p>
                  <p>
                    #{w.rankByHeight} in Height ({w.heightM} m)
                  </p>
                </div>
                <Button
                  endContent={<IoMdSend />}
                  className="text-black bg-lightblue font-bold"
                  onPress={() => handleNavigate(w)}
                  size="sm"
                >
                  Click for more info
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
