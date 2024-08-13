import { ScrollShadow } from "@nextui-org/react";
import useAssociatedRoutes from "../Utilities/useAssociatedRoutes";
import RouteViewCard from "../MapComponents/RouteViewCard";
import { Loading } from "../Utilities/Loading";

function AssociatedRoutes({ wainwright }) {
  const { associatedRoutes, isLoading } = useAssociatedRoutes(wainwright);

  if (isLoading) return <Loading />;

  return associatedRoutes.length > 0 ? (
    <div>
      <h1 className="text-xl font-bold">
        {associatedRoutes.length > 1
          ? `Looking to climb ${wainwright.name}?. Take a look at these
        ${associatedRoutes.length} routes...`
          : `Looking to climb ${wainwright.name}? Why not try this route..`}
      </h1>
      <ScrollShadow className="h-[500px] w-[1000px]">
        {associatedRoutes.map((route) => (
          <div className="grid justify-center p-2" key={route.routeId}>
            <RouteViewCard route={route} />
          </div>
        ))}
      </ScrollShadow>
    </div>
  ) : (
    <p>No associated routes found.</p>
  );
}

export default AssociatedRoutes;
