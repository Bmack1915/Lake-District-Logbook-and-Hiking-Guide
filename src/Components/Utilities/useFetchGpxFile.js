import { useEffect, useState } from "react";
import decodeBase64 from "./Decode64";
import apiClient from "./axiosInterceptor";

const useFetchGpxFile = (route) => {
  const [gpxFileUrl, setGpxFileUrl] = useState("");

  useEffect(() => {
    async function getGpxFile() {
      const res = await apiClient.get(
        `${process.env.REACT_APP_API_BASE_URL}Routes/gpxfile/${route.routeID}`,
      );
      const url = decodeBase64(res.data.gpxFile);
      setGpxFileUrl(url);
    }

    if (route) {
      getGpxFile();
    }
  }, [route]);

  return gpxFileUrl;
};

export default useFetchGpxFile;
