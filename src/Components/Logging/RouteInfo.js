import LeafletGPXMap from "../LeafletMapDev/LeafletGPXMap";
import LogEntry from "./LogEntry";
import RouteLogForm from "./RouteLogForm";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Utilities/apiConfig";
import decodeBase64 from "../Utilities/Decode64";

export default function RouteInfo({ r }) {
  const [associatedWainwrights, setAssociatedWainwrights] = useState([]);
  const [gpxFileUrl, setGpxFileUrl] = useState("");
  const passedState = useLocation();
  const route = passedState.state.r;
  //Get Wainwright info from backend

  useEffect(() => {
    async function getAssociatedWainwrights() {
      const res = await axios.get(
        `${API_BASE_URL}WainwrightRoutes/wainwrights/fromRoute/${route.routeID}`,
      );

      const wainwrightObjs = await res.data.$values;
      setAssociatedWainwrights(wainwrightObjs);
    }

    getAssociatedWainwrights();
  }, [route.routeID]);

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
    <div className="flex justify-between">
      <RouteLogForm route={route} />
      <LeafletGPXMap url={gpxFileUrl} />
    </div>
  );
}
