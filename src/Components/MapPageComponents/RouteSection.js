import { useSelector } from "react-redux";
import RouteFilters from "./RouteFilters";
import { TheMap } from "./Map";
import { Loading } from "../Utilities/Loading";

function RouteSection() {
  const routes = useSelector((state) => state.route.routes);

  return (
    <div className="flex">
      <RouteFilters />
      <div className="m-3 overflow-hidden rounded-xl">
        {routes.length > 0 ? <TheMap type="route" /> : <Loading />}
      </div>
    </div>
  );
}

export default RouteSection;
