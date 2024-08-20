import { Button } from "@nextui-org/react";
import { LiaHikingSolid } from "react-icons/lia";
import {
  FaRegClock,
  FaMapMarkerAlt,
  FaMountain,
  FaHiking,
  FaTachometerAlt,
} from "react-icons/fa";
import timeConverter from "../Utilities/timeConverter";
import { useState } from "react";
import RouteForm from "../LogbookComponents/MyRoutes/RouteForm";
import { FaDownload } from "react-icons/fa";

function RouteInfo({ route, gpxFileUrl }) {
  const [formOpen, setFormOpen] = useState(false);
  function handleDownload() {
    const element = document.createElement("a");

    element.href = gpxFileUrl;
    element.download = `${route.name}_${Date.now()}.gpx`;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); // Clean up
  }
  return (
    <div className="flex h-full w-full flex-col justify-evenly overflow-auto rounded-lg bg-white p-6 shadow-lg">
      <h1 className="text-gray-800 text-3xl font-bold sm:text-4xl md:text-5xl">
        {route.name}
      </h1>
      <p className="text-gray-600 mt-4 text-sm leading-relaxed sm:text-base md:text-lg">
        {route.description}
      </p>
      <ul className="mt-6 space-y-6">
        <li className="text-gray-700 flex items-center text-xl">
          <FaMountain className="text-gray-500 mr-3" /> {route.distanceKm} kM
          (Distance: {route.distanceM} miles)
        </li>
        <li className="text-gray-700 flex items-center text-xl">
          <FaTachometerAlt className="text-gray-500 mr-3" /> Difficulty:{" "}
          {route.difficulty}
        </li>
        <li className="text-gray-700 flex items-center text-xl">
          <FaRegClock className="text-gray-500 mr-3" /> Estimated time:{" "}
          {timeConverter(route.time)}
        </li>
        <li className="text-gray-700 flex items-center text-sm text-xl">
          <FaMapMarkerAlt className="text-gray-500 mr-3" /> Start Point:{" "}
          {route.latitude} Lat, {route.longitude} Lng
        </li>
        <li className="text-gray-700 flex items-center text-xl">
          <FaHiking className="text-gray-500 mr-3" />
          Total elevation climbed: {route.ascentM} m, ({route.ascentF} ft)
        </li>

        <li>
          <Button
            color="primary"
            onPress={handleDownload}
            size="md"
            className="flex items-center text-lg"
          >
            Download GPX File <FaDownload size={20} className="ml-2" />
            {/* <FaLongArrowAltRight className="ml-2" /> */}
          </Button>
        </li>
        <li>
          <div>
            <div>
              <Button
                className="bg-mint text-lg"
                onPress={() => setFormOpen(true)}
              >
                Log Route <LiaHikingSolid size={45} className="ml-2" />
              </Button>
            </div>
            <RouteForm
              type="create"
              route={route}
              setFormOpen={setFormOpen}
              formOpen={formOpen}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default RouteInfo;
