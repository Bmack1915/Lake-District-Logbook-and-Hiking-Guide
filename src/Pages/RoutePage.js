import RouteMap from "../Components/RoutePageComponents/RouteMap";
import AssociatedWainwrights from "../Components/RoutePageComponents/AssociatedWainwrights";
import { useSelector } from "react-redux";
import { Loading } from "../Components/Utilities/Loading";
import { useParams } from "react-router-dom";
import useFetchGpxFile from "../Components/Utilities/useFetchGpxFile";
import { useRoute } from "../Components/Utilities/useRoute";
import RouteInfo from "../Components/RoutePageComponents/RouteInfo";
import WeatherBar from "../Components/RoutePageComponents/weatherBar";
import { useUserRoutes } from "../Components/Utilities/useUserRoutes";

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
        <div className="col-span-3 col-start-2 row-span-2 row-start-6">
          {" "}
          <WeatherBar route={route} />
        </div>
        <div className="col-span-2 col-start-5 row-span-2 row-start-5">
          {" "}
          <AssociatedWainwrights route={route} />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
