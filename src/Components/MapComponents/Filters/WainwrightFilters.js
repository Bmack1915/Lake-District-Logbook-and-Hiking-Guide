import Slider from "../../Utilities/Slider";
import { useSelector } from "react-redux";
import useWainwrightFilters from "../../Utilities/useWainwrightFilters";
import { areas } from "../../Utilities/areas";
import { useCompletedWainwrights } from "../../Utilities/useCompletedWainwrights";
import { Button, Select, SelectItem, Switch } from "@nextui-org/react";
import { maxWHeight, minWHeight } from "../../Utilities/Stats";
import { PiPersonSimpleHikeDuotone } from "react-icons/pi";

function WainwrightFilters({ handlePress }) {
  const id = useSelector((state) => state.user.id);
  const { userWainwrights } = useCompletedWainwrights(id);

  const {
    selectedArea,
    setSelectedArea,
    currentHeight,
    setCurrentHeight,
    completed,
    setCompleted,
    handleReset,
  } = useWainwrightFilters(userWainwrights);
  return (
    <div>
      <div className="grid grid-cols-2 items-center">
        <h1 className="flex justify-center p-5 text-xl font-bold">
          Route Finder
        </h1>
        <div className="flex justify-center">
          <Button color="black" variant="bordered" onPress={handlePress}>
            <PiPersonSimpleHikeDuotone />
            Browse Routes
          </Button>
        </div>
      </div>
      <div className="flex grid-cols-1 flex-col items-center justify-evenly">
        <Select label="Area" onChange={(e) => setSelectedArea(e.target.value)}>
          {areas.map((area) => (
            <SelectItem key={area}>{area}</SelectItem>
          ))}
        </Select>
        <div className="grid w-full border-spacing-8 grid-cols-2 justify-between rounded-lg">
          <Slider
            currentValue={currentHeight}
            setCurrentValue={setCurrentHeight}
            unit="m"
            min={minWHeight}
            max={maxWHeight}
          >
            Height
          </Slider>

          <div className="mb-8 flex items-center justify-center">
            <Switch
              checked={completed}
              onChange={() => setCompleted(!completed)}
              color="primary"
            >
              {completed ? "Completed" : "Uncompleted"}
            </Switch>
          </div>
        </div>

        <Button
          className="p-7"
          onPress={handleReset}
          variant="bordered"
          radius="half"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
export default WainwrightFilters;
