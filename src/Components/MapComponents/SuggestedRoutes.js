import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import RouteViewCard from "./RouteViewCard";
import { ScrollShadow } from "@nextui-org/react";
import WainwrightViewCard from "./WainwrightViewCard";
import { useUserWainwrights } from "../Utilities/useUserWainwrights";

export default function SuggestedRoutes({ type, filterStatus }) {
  const routesData = useSelector((state) => state.route.filteredRoutes);
  const filteredWainwrights = useSelector(
    (state) => state.wainwright.filteredWainwrights,
  );
  const id = useSelector((state) => state.user.id);
  const { userWainwrights } = useUserWainwrights(id);
  const completed = userWainwrights.map((uw) => uw.name);

  // Conditionally assign data based on the type prop
  const data = type === "routes" ? routesData : filteredWainwrights;

  const filteredData = useMemo(() => {
    if (type === "routes") {
      return data;
    }
    if (filterStatus === "completed") {
      return data.filter((w) => completed.includes(w.name));
    } else if (filterStatus === "uncompleted") {
      return data.filter((w) => !completed.includes(w.name));
    } else {
      return data; // "all" status shows all data
    }
  }, [data, filterStatus, type, completed]);

  return (
    <div>
      <p className="text-3xl">{data.length} Results found...</p>
      <div className="container">
        <div className="grid grid-flow-col" spacing={2}>
          {data.length > 1000 ? (
            "Search some routes boi"
          ) : (
            <ScrollShadow className="w-[4 00px] h-[500px]">
              {filteredData.map((dataPoint) => (
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
