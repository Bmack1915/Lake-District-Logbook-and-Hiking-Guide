import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  maxRascent,
  maxRdistance,
  maxRouteTime,
  minRascent,
  minRdistance,
  minRouteTime,
} from "./Stats";
import { setFilteredRoutes } from "../../redux/routeSlice";

//Custom hook for displaying the routes that correspond to the filters.
function useRouteFilters() {
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.route.routes);

  //As sliders are used, giving two values for upper and lower limits of ascent and distance,
  //the state is is a tuple that specifies the upper and lower limits of the search criteria.
  const [currentAscent, setCurrentAscent] = useState([minRascent, maxRascent]);
  const [currentDistance, setCurrentDistance] = useState([
    minRdistance,
    maxRdistance,
  ]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [time, setTime] = useState([minRouteTime, maxRouteTime]);
  const [query, setQuery] = useState("");

  //Everytime a filter is updated, re-filter the original dataset of routes to get the results
  useEffect(() => {
    function checkFilter() {
      let filtered = Array.isArray(routes) ? routes : [];

      //Get the routes that fall between the sliders upper and lower bounds
      filtered = filtered.filter(
        (r) => r.ascentM >= currentAscent[0] && r.ascentM <= currentAscent[1],
      );

      filtered = filtered.filter(
        (r) =>
          r.distanceKm >= currentDistance[0] &&
          r.distanceKm <= currentDistance[1],
      );

      filtered = filtered.filter(
        (r) =>
          Math.floor(r.time / 60) >= time[0] &&
          Math.ceil(r.time / 60) <= time[1],
      );

      if (query.length > 0) {
        filtered = filtered.filter((r) =>
          r.name.toLowerCase().includes(query.toLowerCase()),
        );
      }

      if (selectedDifficulty === "All");
      else if (selectedDifficulty) {
        filtered = filtered.filter((r) => r.difficulty === selectedDifficulty);
      }
      dispatch(setFilteredRoutes(filtered));
    }

    checkFilter();
  }, [
    currentAscent,
    currentDistance,
    dispatch,
    routes,
    selectedDifficulty,
    time,
    query,
  ]);

  function HandleReset() {
    dispatch(setFilteredRoutes(routes));
    setCurrentAscent([minRascent, maxRascent]);
    setCurrentDistance([minRdistance, maxRdistance]);
    setTime([minRouteTime, maxRouteTime]);
    setSelectedDifficulty("");
    setQuery("");
  }

  return {
    HandleReset,
    setCurrentDistance,
    currentDistance,
    setCurrentAscent,
    currentAscent,
    setSelectedDifficulty,
    selectedDifficulty,
    time,
    setTime,
    query,
    setQuery,
  };
}

export default useRouteFilters;
