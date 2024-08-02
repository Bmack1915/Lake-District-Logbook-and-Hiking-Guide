import { Button, Select, SelectItem } from "@nextui-org/react";
import Slider from "../Utilities/Slider";
import { difficulties } from "../Utilities/difficulties";
import {
  maxRascent,
  maxRdistance,
  maxRouteTime,
  minRascent,
  minRdistance,
  minRouteTime,
} from "../Utilities/Stats";
import useRouteFilters from "../Utilities/useRouteFilters";
import { LuMountainSnow } from "react-icons/lu";

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
    <div>
      <div className="grid grid-cols-2 items-center">
        <h1 className="flex justify-center p-5 text-xl font-bold">
          Route Finder
        </h1>
        <div className="flex justify-center">
          <Button color="black" variant="bordered" onPress={handlePress}>
            <LuMountainSnow /> Browse Wainwrights
          </Button>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 p-4">
        <div className="flex w-full justify-center">
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
        </div>

        <div className="flex flex-col justify-evenly">
          <Slider
            currentValue={currentAscent}
            setCurrentValue={setCurrentAscent}
            unit="metres"
            min={minRascent}
            max={maxRascent}
          >
            🧗🏻‍♂️ Ascent
          </Slider>
        </div>

        <div className="flex flex-col justify-evenly">
          <Slider
            currentValue={currentDistance}
            setCurrentValue={setCurrentDistance}
            unit="km"
            min={minRdistance}
            max={maxRdistance}
          >
            🥾 Length of walk
          </Slider>
        </div>

        <div className="flex flex-col justify-evenly">
          <Slider
            currentValue={time}
            setCurrentValue={setTime}
            unit="hrs"
            min={minRouteTime}
            max={maxRouteTime}
          >
            ⏱️ Duration
          </Slider>
        </div>
      </div>

      <div className="flex justify-center">
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
    </div>
  );
}
export default RouteFilters;
