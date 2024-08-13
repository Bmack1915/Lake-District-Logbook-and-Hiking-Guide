import Slider from "../../Utilities/Slider";
import { useSelector } from "react-redux";
import useWainwrightFilters from "../../Utilities/useWainwrightFilters";

import { Button, Select, SelectItem } from "@nextui-org/react";
import { maxWHeight, minWHeight } from "../../Utilities/Stats";
import { useUserWainwrights } from "../../Utilities/useUserWainwrights";
import { RadioGroup, Radio } from "@nextui-org/react";
import Search from "./SearchBar";
import { areas } from "../../Utilities/utilityFuncsStats";

function WainwrightFilters() {
  const id = useSelector((state) => state.user.id);
  const { userWainwrights } = useUserWainwrights(id);

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
    <div className="flex flex-col items-center justify-between space-y-6">
      <Search placeholder="Wainwrights" query={query} setQuery={setQuery} />
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
