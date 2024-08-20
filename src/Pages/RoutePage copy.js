import RouteMap from "../Components/RoutePageComponents/RouteMap";
import RouteLogForm from "../Components/RoutePageComponents/RouteLogForm";
import AssociatedWainwrights from "../Components/RoutePageComponents/AssociatedWainwrights";
import { useSelector } from "react-redux";
import { Loading } from "../Components/Utilities/Loading";
import { useParams } from "react-router-dom";
import useFetchGpxFile from "../Components/Utilities/useFetchGpxFile";
import { useRoute } from "../Components/Utilities/useRoute";
import RouteInfo from "../Components/RoutePageComponents/RouteInfo";
import WeatherBar from "../Components/RoutePageComponents/weatherBar";
import { useUserRoutes } from "../Components/Utilities/useUserRoutes";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import RouteForm from "../Components/LogbookComponents/MyRoutes/RouteForm";

export default function RouteHomePage() {
  const { id } = useParams();
  const { route } = useRoute(id);
  const gpxFileUrl = useFetchGpxFile(route);
  const userID = useSelector((state) => state.user.id);
  const { userRoutes } = useUserRoutes(userID);

  const completed = userRoutes.some(
    (userRoute) => userRoute.routeID === Number(id),
  );

  if (!route) {
    return <Loading />;
  }

  return (
    <div>
      <div className="root grid-rows-auto grid max-h-[80vh] min-h-[80vh] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-rows-5 xl:grid-cols-5">
        <div className="sm:col-span-2 md:col-span-1 lg:row-span-4">
          <RouteInfo gpxFileUrl={gpxFileUrl} route={route} />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-5">
          <WeatherBar route={route} />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-4 lg:row-start-5">
          <AssociatedWainwrights route={route} />
        </div>
        <div className="col-span-2 sm:col-span-2 md:col-span-5 lg:col-span-5 lg:col-start-2 lg:row-span-4 lg:row-start-1">
          <RouteMap url={gpxFileUrl} />
        </div>
      </div>
    </div>
  );
}
