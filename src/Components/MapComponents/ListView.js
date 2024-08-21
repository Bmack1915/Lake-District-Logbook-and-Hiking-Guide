import RouteFilters from "./Filters/RouteFilters";
import WainwrightFilters from "./Filters/WainwrightFilters";
import Suggestions from "./Suggestions";

function ListView({ type }) {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <h5 className="text-gray-500 dark:text-gray-400 p-4 text-center text-2xl font-semibold uppercase">
          Filters
        </h5>
        {type === "routes" && <RouteFilters />}
        {type === "wainwrights" && <WainwrightFilters />}
      </div>
      <div className="col-span- px-5 pt-3">
        <Suggestions type={type} />
      </div>
    </div>
  );
}

export default ListView;
