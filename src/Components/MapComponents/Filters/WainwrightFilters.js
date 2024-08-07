import Slider from "../../Utilities/Slider";
import { useSelector } from "react-redux";
import useWainwrightFilters from "../../Utilities/useWainwrightFilters";
import { areas } from "../../Utilities/areas";
import { Button, Select, SelectItem, Switch } from "@nextui-org/react";
import { maxWHeight, minWHeight } from "../../Utilities/Stats";

function WainwrightFilters({ handlePress }) {
  const userWainwrights = useSelector((state) => state.user.userWainwrights);
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
    <div className="flex flex-col items-center justify-between space-y-6">
      <div className="flex w-48 justify-center">
        <Select label="Area" onChange={(e) => setSelectedArea(e.target.value)}>
          {areas.map((area) => (
            <SelectItem key={area}>{area}</SelectItem>
          ))}
        </Select>
      </div>

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

      <Button
        className="p-3"
        color="primary"
        onPress={handleReset}
        variant="bordered"
        radius="half"
      >
        Reset Filters
      </Button>
    </div>
  );
}
export default WainwrightFilters;
