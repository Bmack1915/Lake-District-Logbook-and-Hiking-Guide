import { Button, Select, SelectItem } from "@nextui-org/react";
import Slider from "../../Utilities/Slider";
import { FaMountain, FaHiking, FaClock } from "react-icons/fa";
import { difficulties } from "../../Utilities/difficulties";
import {
  maxRascent,
  maxRdistance,
  maxRouteTime,
  minRascent,
  minRdistance,
  minRouteTime,
} from "../../Utilities/Stats";
import useRouteFilters from "../../Utilities/useRouteFilters";

//Purpose of this component is to give the user filters, that is then used to update the state of the filteredRoutes via the setFilteredRoutes
function RouteFilters({ handlePress }) {
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
  } = useRouteFilters();

  return (
    // Create a radio button for each area, and set the selected area to the selectedArea state via controlled inputs.
    <div className="flex flex-col items-center justify-between space-y-6">
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
        currentValue={currentAscent}
        setCurrentValue={setCurrentAscent}
        unit="metres"
        min={minRascent}
        max={maxRascent}
      >
        <div className="flex items-center">
          <FaMountain size={36} /> Ascent
        </div>
      </Slider>

      <Slider
        currentValue={currentDistance}
        setCurrentValue={setCurrentDistance}
        unit="km"
        min={minRdistance}
        max={maxRdistance}
      >
        <div className="flex items-center">
          <FaHiking size={36} /> Length of Walk
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
          <FaClock size={36} /> Estimated Time
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
