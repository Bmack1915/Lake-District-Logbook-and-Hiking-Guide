import { ScrollShadow } from "@nextui-org/react";
import RouteViewCard from "../MapComponents/RouteViewCard";
import { lakeDistrictImages } from "../Utilities/WainwrightImages";

function AssociatedRoutes({ wainwright, associatedRoutes }) {
  //Function to get image at the index of its positiion in the array so it can be used in a .map function
  function getImages(index) {
    // modulo operation to cycle through images
    return lakeDistrictImages[index % lakeDistrictImages.length];
  }
  return associatedRoutes && associatedRoutes.length > 0 ? (
    <div>
      <h1 className="pb-3 pt-3 text-2xl font-bold">
        {associatedRoutes.length > 1
          ? `Looking to climb ${wainwright.name}? Take a look at these
        ${associatedRoutes.length} routes...`
          : `Looking to climb ${wainwright.name}? Why not try this route..`}
      </h1>
      <ScrollShadow className="h-[500px] w-[1050px]">
        {associatedRoutes.map((route, index) => (
          <div className="grid justify-center p-2" key={index}>
            <RouteViewCard img={getImages(index)} route={route} />
          </div>
        ))}
      </ScrollShadow>
    </div>
  ) : null;
}

export default AssociatedRoutes;
