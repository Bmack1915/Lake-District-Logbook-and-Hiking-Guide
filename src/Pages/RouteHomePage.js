import LeafletGPXMap from "../Components/LeafletMapDev/LeafletGPXMap";
import RouteLogForm from "../Components/RouteLogging/RouteLogForm";
import AssociatedWainwrights from "../Components/RouteLogging/AssociatedWainwrights";
import { useSelector } from "react-redux";
import { Loading } from "../Components/Utilities/Loading";
import { useParams } from "react-router-dom";
import useFetchGpxFile from "../Components/Utilities/useFetchGpxFile";
import { useRoute } from "../Components/Utilities/useRoute";
import RouteInfo from "../Components/RouteLogging/RouteInfo";

export default function RouteHomePage() {
  const { id } = useParams();
  const { route } = useRoute(id);
  const gpxFileUrl = useFetchGpxFile(route);

  const userRoutes = useSelector((state) => state.user.userRoutes);
  const completed = userRoutes.some(
    (userRoute) => userRoute.routeID === Number(id),
  );
  if (!route) {
    return <Loading />;
  }

  return (
    <div className="root grid-rows-auto grid max-h-[80vh] min-h-[80vh] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-rows-5 xl:grid-cols-5">
      <div className="sm:col-span-2 md:col-span-1 lg:row-span-4">
        <RouteInfo route={route} />
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-5">
        <h1 className="items center flex text-9xl">WEATHER API</h1>
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-4 lg:row-start-5">
        <AssociatedWainwrights route={route} />
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 lg:col-start-2 lg:row-span-4 lg:row-start-1">
        <LeafletGPXMap url={gpxFileUrl} />
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-start-5 lg:row-span-4 lg:row-start-1">
        {completed ? (
          <h1>You have completed this route! See it in your logbook!</h1>
        ) : (
          <RouteLogForm route={route} />
        )}
      </div>
    </div>
  );
}
