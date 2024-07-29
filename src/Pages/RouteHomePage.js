import LeafletGPXMap from "../Components/LeafletMapDev/LeafletGPXMap";
import RouteLogForm from "../Components/RouteLogging/RouteLogForm";
import { useEffect } from "react";
import AssociatedWainwrights from "../Components/RouteLogging/AssociatedWainwrights";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Components/Utilities/Loading";
import { useParams } from "react-router-dom";
import { setSelectedRouteById } from "../redux/routeSlice";
import useFetchGpxFile from "../Components/Utilities/useFetchGpxFile";
import { useRoute } from "../Components/Utilities/useRoute";

export default function RouteHomePage() {
  const { id } = useParams();
  const { route } = useRoute(id);
  const gpxFileUrl = useFetchGpxFile(route);

  const userRoutes = useSelector((state) => state.user.userRoutes);
  console.log("UserRoutes are", userRoutes);
  const completed = userRoutes.some(
    (userRoute) => userRoute.routeID === Number(id),
  );

  // useEffect(() => {
  //   dispatch(setSelectedRouteById(id));
  // }, [dispatch, id]);

  if (!route) {
    return <Loading />;
  }

  return (
    <div>
      {route ? (
        <div className="flex w-full flex-row justify-evenly">
          <div className="flex w-1/2 flex-col">
            {completed ? (
              <h1>You have completed this route! See it in your logbook!</h1>
            ) : (
              <RouteLogForm route={route} />
            )}
            <AssociatedWainwrights route={route} />
          </div>
          <div className="w-full">
            <LeafletGPXMap url={gpxFileUrl} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
