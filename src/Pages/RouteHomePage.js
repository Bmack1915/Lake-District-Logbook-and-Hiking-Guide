import LeafletGPXMap from "../Components/LeafletMapDev/LeafletGPXMap";
import RouteLogForm from "../Components/RouteLogging/RouteLogForm";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Components/Utilities/apiConfig";
import decodeBase64 from "../Components/Utilities/Decode64";
import AssociatedWainwrights from "../Components/RouteLogging/AssociatedWainwrights";

export default function RouteHomePage() {
  const [gpxFileUrl, setGpxFileUrl] = useState("");
  const passedState = useLocation();
  const route = passedState.state.r;

  //Get GpX file from backend and decode & set as URL.
  useEffect(() => {
    async function getGpxFile() {
      const res = await axios.get(
        `${API_BASE_URL}Routes/gpxfile/${route.routeID}`,
      );
      const url = decodeBase64(res.data.gpxFile);
      setGpxFileUrl(url);
    }
    getGpxFile();
  }, [route.routeID]);

  return (
    <div className="flex h-screen w-full justify-evenly">
      <AssociatedWainwrights route={route} />
      <RouteLogForm route={route} />
      <LeafletGPXMap url={gpxFileUrl} />
    </div>
  );
}
