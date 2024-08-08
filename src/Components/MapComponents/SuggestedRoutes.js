import React from "react";
import { useSelector } from "react-redux";
import RouteViewCard from "./RouteViewCard";
import { ScrollShadow } from "@nextui-org/react";
import WainwrightViewCard from "./WainwrightViewCard";

export default function SuggestedRoutes({ type }) {
  const routesData = useSelector((state) => state.route.filteredRoutes);
  const wainwrightsData = useSelector(
    (state) => state.wainwright.filteredWainwrights,
  );

  // Conditionally assign data based on the type prop
  const data = type === "routes" ? routesData : wainwrightsData;
  console.log("Data", data);

  return (
    <div>
      <p className="text-3xl">{data.length} Results found...</p>
      <div className="container">
        <div className="grid grid-flow-col" spacing={2}>
          {data.length > 1000 ? (
            "Search some routes boi"
          ) : (
            <ScrollShadow className="w-[4 00px] h-[500px]">
              {data.map((dataPoint) => (
                <div className="grid justify-center p-2" key={data.id}>
                  {type === "routes" && <RouteViewCard route={dataPoint} />}
                  {type === "wainwrights" && (
                    <WainwrightViewCard wainwright={dataPoint} />
                  )}
                </div>
              ))}
            </ScrollShadow>
          )}
        </div>
      </div>
    </div>
  );
}
