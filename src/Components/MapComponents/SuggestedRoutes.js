import React from "react";
import { useSelector } from "react-redux";
import RouteViewCard from "./RouteViewCard";
import { ScrollShadow } from "@nextui-org/react";
import { Loading } from "../Utilities/Loading";

export default function SuggestedRoutes() {
  const filteredRoutes = useSelector((state) => state.route.filteredRoutes);

  return (
    <div className="container">
      <div className="grid grid-flow-col" spacing={2}>
        {filteredRoutes.length > 10 ? (
          "Search some routes boi"
        ) : (
          <ScrollShadow className="w-[4 00px] h-[400px]">
            {filteredRoutes.map((route) => (
              <div className="grid justify-center p-2" key={route.id}>
                <RouteViewCard route={route} />
              </div>
            ))}
          </ScrollShadow>
        )}
      </div>
    </div>
  );
}
