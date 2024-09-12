import { Button } from "@nextui-org/react";
import { LiaHikingSolid } from "react-icons/lia";
import {
  FaRegClock,
  FaMapMarkerAlt,
  FaMountain,
  FaHiking,
  FaTachometerAlt,
  FaDownload,
} from "react-icons/fa";
import timeConverter from "../Utilities/timeConverter";
import { useEffect, useState } from "react";
import RouteForm from "../LogbookComponents/MyRoutes/RouteForm";
import RouteLog from "../LogbookComponents/MyRoutes/RouteLog";
import { useSelector } from "react-redux";
import AssociatedWainwrights from "./AssociatedWainwrights";

function RouteInfo({ route, gpxFileUrl }) {
  const userRoutes = useSelector((state) => state.user.userRoutes);
  const [loggedRoute, setLoggedRoute] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  function handleEditClickOpen() {
    setEditOpen(true);
  }

  //Check if the user has completed the route
  useEffect(() => {
    if (route && userRoutes.length > 0) {
      const matchingUserRoute = userRoutes.find(
        (ur) => ur.routeID === route.routeID,
      );
      setLoggedRoute(matchingUserRoute);
    } else {
      setLoggedRoute(null);
    }
  }, [route, userRoutes]);

  //Download of GPX
  function handleDownload() {
    const element = document.createElement("a");
    element.href = gpxFileUrl;
    //Label for download
    element.download = `${route.name}_${Date.now()}.gpx`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="flex h-full w-full flex-col justify-evenly overflow-auto rounded-lg bg-white p-6 shadow-lg">
      <h1 className="text-gray-800 text-3xl font-bold sm:text-4xl md:text-5xl">
        {route.name}
      </h1>
      <p className="text-gray-600 mt-4 text-sm leading-relaxed sm:text-base md:text-lg">
        {route.description}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="text-gray-700 flex items-center text-xl">
          <FaMountain className="text-gray-500 mr-3" />
          {route.distanceKm} km (Distance: {route.distanceM} miles)
        </div>
        <div className="text-gray-700 flex items-center text-xl">
          <FaTachometerAlt className="text-gray-500 mr-3" />
          Difficulty: {route.difficulty}
        </div>
        <div className="text-gray-700 flex items-center text-xl">
          <FaRegClock className="text-gray-500 mr-3" />
          Estimated time: {timeConverter(route.time)}
        </div>
        <div className="text-gray-700 flex items-center text-xl">
          <FaMapMarkerAlt className="text-gray-500 mr-3" />
          Start Point: {route.latitude} Lat, {route.longitude} Lng
        </div>
        <div className="text-gray-700 flex items-center text-xl">
          <FaHiking className="text-gray-500 mr-3" />
          Total elevation climbed: {route.ascentM} m, ({route.ascentF} ft)
        </div>
      </div>

      <div className="flex justify-between pt-9">
        <div className="flex flex-col">
          <div className="mt-6">
            <Button
              color="primary"
              onPress={handleDownload}
              className="flex items-center font-poppins text-xl"
            >
              Download GPX File{" "}
              <FaDownload size={20} className="ml-2 text-xl" />
            </Button>
          </div>

          {/* Log or View */}
          <div className="mt-6">
            <Button
              className="w-60 bg-mint font-poppins text-xl"
              onPress={() => setFormOpen(true)}
            >
              {loggedRoute ? "View Log" : "Log Route"}
              <LiaHikingSolid size={45} className="ml-2" />
            </Button>

            {loggedRoute && (
              <div>
                <RouteLog
                  open={formOpen}
                  setOpen={setFormOpen}
                  userRoute={loggedRoute}
                  handleEditClickOpen={handleEditClickOpen}
                />
                <RouteForm
                  type="edit"
                  userRoute={loggedRoute}
                  route={route}
                  setFormOpen={setEditOpen}
                  formOpen={editOpen}
                />
              </div>
            )}
          </div>

          {/* Create Form available to be used if route not previously logged */}
          {!loggedRoute && (
            <RouteForm
              type="create"
              route={route}
              setFormOpen={setFormOpen}
              formOpen={formOpen}
            />
          )}
        </div>
        <AssociatedWainwrights route={route} />
      </div>
    </div>
  );
}

export default RouteInfo;
