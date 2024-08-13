import { Button } from "@nextui-org/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LiaHikingSolid } from "react-icons/lia";
import {
  FaRegClock,
  FaMapMarkerAlt,
  FaMountain,
  FaHiking,
  FaTachometerAlt,
} from "react-icons/fa";

function RouteInfo({ route, gpxFileUrl }) {
  function handleDownload() {
    const element = document.createElement("a");

    element.href = gpxFileUrl;
    element.download = `${route.name}_${Date.now()}.gpx`;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); // Clean up
  }

  return (
    <div className="flex h-full w-full flex-col justify-evenly overflow-auto p-4">
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
        {route.name}
      </h1>
      <p className="mt-5 text-sm sm:text-base md:text-lg">
        {route.description}
      </p>
      <ul className="mb-5 mt-5 space-y-5">
        <li className="flex items-center">
          <FaMountain className="mr-3" /> {route.distanceKm} kM ( Distance:{" "}
          {route.distanceM} miles)
        </li>
        <li className="flex items-center">
          <FaTachometerAlt className="mr-3" /> Difficulty: {route.difficulty}
        </li>
        <li className="flex items-center">
          <FaRegClock className="mr-3" /> Estimated time: {route.time} minutes
        </li>
        <li className="flex items-center text-sm">
          <FaMapMarkerAlt className="mr-3" /> Start Point {route.latitude} Lat,{" "}
          {route.longitude} Lng
        </li>
        <li className="flex items-center">
          <FaHiking className="mr-3" />
          Total elevation climbed {route.ascentM} m, ({route.ascentF} ft)
        </li>
        <li>
          <Button
            color="primary"
            onPress={handleDownload}
            size="md"
            className="flex items-center"
          >
            Download GPX File <LiaHikingSolid className="ml-2" />
            <FaLongArrowAltRight className="ml-2" />
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default RouteInfo;
