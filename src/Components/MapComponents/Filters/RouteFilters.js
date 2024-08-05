import { Button, Select, SelectItem } from "@nextui-org/react";
import Slider from "../../Utilities/Slider";
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
import { LuMountainSnow } from "react-icons/lu";
import FilterBar from "./FilterBar";

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
    <div className="flex w-1/2 flex-col items-center justify-evenly">
      <h1 className="text-xl font-bold">Route Finder</h1>

      <Button color="black" variant="bordered" onPress={handlePress}>
        <LuMountainSnow /> Browse Wainwrights
      </Button>

      <div className="flex w-48 justify-center">
        <Select
          label="Difficulty"
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          {difficulties.map((difficulty) => (
            <SelectItem key={difficulty}>{difficulty}</SelectItem>
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
        🧗🏻‍♂️ Ascent
      </Slider>

      <Slider
        currentValue={currentDistance}
        setCurrentValue={setCurrentDistance}
        unit="km"
        min={minRdistance}
        max={maxRdistance}
      >
        🥾 Length of walk
      </Slider>

      <Slider
        currentValue={time}
        setCurrentValue={setTime}
        unit="hrs"
        min={minRouteTime}
        max={maxRouteTime}
      >
        ⏱️ Duration
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
