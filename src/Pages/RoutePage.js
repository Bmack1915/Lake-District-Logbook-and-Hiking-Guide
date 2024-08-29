import RouteMap from "../Components/RoutePageComponents/RouteMap";
import { useParams } from "react-router-dom";
import useFetchGpxFile from "../Components/Utilities/useFetchGpxFile";
import RouteInfo from "../Components/RoutePageComponents/RouteInfo";
import WeatherBar from "../Components/RoutePageComponents/weatherBar";
import { useEffect, useState } from "react";
import { fetchRouteData } from "../Components/Utilities/fetchRouteData";

export default function RouteHomePage() {
  const { id } = useParams();
  const [route, setRoute] = useState(null);

  const gpxFileUrl = useFetchGpxFile(route);

  useEffect(() => {
    async function getData() {
      const res = await fetchRouteData(id);
      setRoute(res.data);
    }

    if (id) getData();
  }, [id]);

  if (route && route.name.length > 0)
    return (
      <div>
        <div className="grid grid-cols-7 grid-rows-6 gap-4">
          <div className="col-span-5 col-start-2 row-span-2">
            <RouteInfo gpxFileUrl={gpxFileUrl} route={route} />
          </div>
          <div className="col-span-5 col-start-2 row-span-2 row-start-3">
            <h1 className="pb-5 text-2xl font-bold sm:text-3xl md:text-4xl">
              Route Map
            </h1>
            <RouteMap url={gpxFileUrl} />
          </div>
          <div className="col-span-5 col-start-2 row-span-2 row-start-5 pt-16">
            <h1 className="pb-3 pt-3 text-3xl font-bold">
              Planning this route? Check for a rainy day...
            </h1>
            <WeatherBar route={route} />
          </div>
        </div>
      </div>
    );
}
