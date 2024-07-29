import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setFilteredRoutes } from "../../redux/routeSlice";
import Slider from "../Slider";

//Purpose of this component is to give the user filters, that is then used to update the state of the filteredRoutes via the setFilteredRoutes
function RouteFilters() {
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.route.routes);

  const [currentAscent, setCurrentAscent] = useState([0, 1200]);
  const [currentDistance, setCurrentDistance] = useState([0, 50]);
  const [selectedDifficulty, setSelectedDifficulty] = useState();
  const [time, setTime] = useState([0, 600]);

  const difficulties = [
    "Easy",
    "Easy/Moderate",
    "Moderate",
    "Moderate/Hard",
    "Hard",
    "Very Hard",
    "Severe",
  ];

  useEffect(() => {
    function checkFilter() {
      let filtered = Array.isArray(routes) ? routes : [];

      filtered = filtered.filter(
        (r) => r.ascentM >= currentAscent[0] && r.ascentM <= currentAscent[1],
      );

      filtered = filtered.filter(
        (r) =>
          r.distanceKm >= currentDistance[0] &&
          r.distanceKm <= currentDistance[1],
      );

      filtered = filtered.filter((r) => r.time >= time[0] && r.time <= time[1]);

      if (selectedDifficulty) {
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
  ]);

  function HandleReset() {
    dispatch(setFilteredRoutes(routes));
    setCurrentAscent([0, 11000]);
    setCurrentDistance([0, 60]);
    setTime([0, 900]);
    setSelectedDifficulty(null);
  }

  return (
    // Create a radio button for each area, and set the selected area to the selectedArea state via controlled inputs.
    <div className="spacing-5 m-3 overflow-hidden rounded-xl border-8 border-double bg-white p-3">
      <h1 className="flex justify-center p-5 text-xl font-bold">
        Route Finder
      </h1>
      <div className="flex flex-wrap">
        {difficulties.map((difficulty) => (
          <div
            key={difficulty}
            className="mb-2 mr-4 flex items-center font-bold"
          >
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="areaFilter"
                value={difficulty}
                checked={selectedDifficulty === difficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="mr-2"
              />
              {difficulty}
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-evenly">
        <div className="mb-10 flex flex-col justify-evenly py-4">
          <Slider
            currentValue={currentAscent}
            setCurrentValue={setCurrentAscent}
            unit="metres"
            min={0}
            max={11000}
          >
            Ascent
          </Slider>

          <Slider
            currentValue={currentDistance}
            setCurrentValue={setCurrentDistance}
            unit="km"
            min={0}
            max={100}
          >
            Length of walk
          </Slider>

          <Slider
            currentValue={time}
            setCurrentValue={setTime}
            unit="hrs"
            min={0}
            max={1000}
          >
            Duration
          </Slider>
        </div>

        <div className="flex justify-center">
          <button
            onClick={HandleReset}
            className="mb-2 me-2 flex inline-flex w-full justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
export default RouteFilters;
