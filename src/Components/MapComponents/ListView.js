import RouteFilters from "./Filters/RouteFilters";
import WainwrightFilters from "./Filters/WainwrightFilters";
import SuggestedRoutes from "./SuggestedRoutes";

function ListView({ type }) {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        {type === "routes" && <RouteFilters />}
        {type === "wainwrights" && <WainwrightFilters />}
      </div>
      <div className="col-span-3">
        <SuggestedRoutes type={type} />
      </div>
    </div>
  );
}

export default ListView;
