import { areas } from "../../Utilities/utilityFuncsStats";
import { useSelector } from "react-redux";
import { RadioGroup, Radio } from "@nextui-org/react";
import { maxWHeight, minWHeight } from "../../Utilities/Stats";
import { Button, Select, SelectItem } from "@nextui-org/react";

import useWainwrightFilters from "../../Utilities/useWainwrightFilters";
import Slider from "../../Utilities/Slider";
import Search from "./SearchBar";

function WainwrightFilters() {
  const userWainwrights = useSelector((state) => state.user.userWainwrights);

  const {
    selectedArea,
    setSelectedArea,
    currentHeight,
    setCurrentHeight,
    handleReset,
    filterStatus,
    setFilterStatus,
    query,
    setQuery,
  } = useWainwrightFilters(userWainwrights);

  return (
    <div className="flex flex-col items-center justify-between space-y-10 pt-5">
      <Search placeholder="Wainwrights" query={query} setQuery={setQuery} />
      <div className="mb-8 flex items-center justify-center">
        <RadioGroup
          value={filterStatus}
          onValueChange={setFilterStatus}
          defaultValue="all"
        >
          <Radio value="all">All</Radio>
          <Radio value="completed">Completed</Radio>
          <Radio value="uncompleted">Uncompleted</Radio>
        </RadioGroup>
      </div>
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
