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

function RouteInfo({ route }) {
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
          <FaMountain className="mr-3" /> {route.distanceKm} kM (
          {route.distanceM} miles)
        </li>
        <li className="flex items-center">
          <FaTachometerAlt className="mr-3" /> {route.difficulty}
        </li>
        <li className="flex items-center">
          <FaRegClock className="mr-3" /> Estimated time: {route.time} minutes
        </li>
        <li className="flex items-center text-sm">
          <FaMapMarkerAlt className="mr-3" /> Start Point {route.latitude} Lat,{" "}
          {route.longitude} Lng
        </li>
        <li className="flex items-center">
          <FaHiking className="mr-3" /> {route.ascentM} m ({route.ascentF})
          climb
        </li>
        <li>
          <Button color="primary" size="md" className="flex items-center">
            Download GPX File <LiaHikingSolid className="ml-2" />
            <FaLongArrowAltRight className="ml-2" />
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default RouteInfo;
