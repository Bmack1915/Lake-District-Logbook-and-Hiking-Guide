import React from "react";
import { useSelector } from "react-redux";
import RouteViewCard from "./RouteViewCard";
import { ScrollShadow } from "@nextui-org/react";
import WainwrightViewCard from "./WainwrightViewCard";
import { lakeDistrictImages } from "../Utilities/WainwrightImages";

export default function Suggestions({ type }) {
  const filteredRoutes = useSelector((state) => state.route.filteredRoutes);
  const filteredWainwrights = useSelector(
    (state) => state.wainwright.filteredWainwrights,
  );

  // Conditionally assign data based on the type prop
  const data = type === "routes" ? filteredRoutes : filteredWainwrights;

  function getImages(index) {
    // modulo operation to cycle through images
    return lakeDistrictImages[index % lakeDistrictImages.length];
  }

  return (
    <div>
      <p className="text-3xl">{data.length} Results found...</p>

      <div className="grid grid-flow-col" spacing={2}>
        {data.length > 1000 ? (
          "Have a search!"
        ) : (
          <ScrollShadow className="h-[700px] w-[1000px]">
            {data.map((dataPoint, index) => (
              <div className="grid justify-center p-2" key={dataPoint.id}>
                {type === "routes" && (
                  <RouteViewCard img={getImages(index)} route={dataPoint} />
                )}
                {type === "wainwrights" && (
                  <WainwrightViewCard
                    img={getImages(index)}
                    wainwright={dataPoint}
                  />
                )}
              </div>
            ))}
          </ScrollShadow>
        )}
      </div>
    </div>
  );
}
