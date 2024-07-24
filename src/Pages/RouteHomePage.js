import LeafletGPXMap from "../Components/LeafletMapDev/LeafletGPXMap";
import RouteLogForm from "../Components/RouteLogging/RouteLogForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Components/Utilities/apiConfig";
import decodeBase64 from "../Components/Utilities/Decode64";
import AssociatedWainwrights from "../Components/RouteLogging/AssociatedWainwrights";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Components/Utilities/Loading";
import { useParams } from "react-router-dom";
import { setSelectedRouteById } from "../redux/routeSlice";
import useFetchGpxFile from "../Components/Utilities/useFetchGpxFile";

export default function RouteHomePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const route = useSelector((state) => state.route.selectedRoute);
  const gpxFileUrl = useFetchGpxFile(route);

  const userRoutes = useSelector((state) => state.user.userRoutes);
  const completed = userRoutes.some(
    (userRoute) => userRoute.routeID === Number(id),
  );

  useEffect(() => {
    dispatch(setSelectedRouteById(id));
  }, [dispatch, id]);

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
