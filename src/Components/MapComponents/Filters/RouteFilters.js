import { Button, Select, SelectItem } from "@nextui-org/react";
import Slider from "../../Utilities/Slider";

import {
  maxRascent,
  maxRdistance,
  maxRouteTime,
  minRascent,
  minRdistance,
  minRouteTime,
} from "../../Utilities/Stats";
import useRouteFilters from "../../Utilities/useRouteFilters";
import Search from "./SearchBar";
import { difficulties } from "../../Utilities/utilityFuncsStats";

//Purpose of this component is to give the user filters, that is then used to update the state of the filteredRoutes via the setFilteredRoutes
function RouteFilters() {
  //Handling of updating the filter results handled in a custom hook
  const {
    currentAscent,
    setCurrentAscent,
    currentDistance,
    setCurrentDistance,
    selectedDifficulty,
    setSelectedDifficulty,
    time,
    setTime,
    HandleReset,
    query,
    setQuery,
  } = useRouteFilters();

  return (
    // Create a radio button for each area, and set the selected area to the selectedArea state via controlled inputs.
    <div className="flex flex-col items-center justify-between space-y-6">
      <Search placeholder="Routes" query={query} setQuery={setQuery} />
      <div className="flex w-48 justify-center">
        <Select
          label="Difficulty"
          placeholder="All"
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          {difficulties.map((difficulty) => (
            <SelectItem key={difficulty} value={difficulty}>
              {difficulty}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Slider
        currentValue={currentDistance}
        setCurrentValue={setCurrentDistance}
        unit="km"
        min={minRdistance}
        max={maxRdistance}
      >
        <div className="flex items-center">
          <p className="px-4">Length of Walk</p>
        </div>
      </Slider>

      <Slider
        currentValue={time}
        setCurrentValue={setTime}
        unit="hrs"
        min={minRouteTime}
        max={maxRouteTime}
      >
        <div className="flex items-center">
          <p className="px-4">Estimated Time</p>
        </div>
      </Slider>

      <Slider
        currentValue={currentAscent}
        setCurrentValue={setCurrentAscent}
        unit="metres"
        min={minRascent}
        max={maxRascent}
      >
        <div className="flex items-center">
          <p className="overflow-auto px-4 text-center">
            Total Elevation Climbed
          </p>
        </div>
      </Slider>

      <Button
        className="p-3"
        color="primary"
        onPress={HandleReset}
        variant="bordered"
        radius="half"
      >
        Reset Filters
      </Button>
    </div>
  );
}
export default RouteFilters;
