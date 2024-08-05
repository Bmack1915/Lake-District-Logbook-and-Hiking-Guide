import { Card, CardHeader, Image } from "@nextui-org/react";
import * as React from "react";

export default function RouteViewCard({ route }) {
  return (
    <Card className="">
      <CardHeader className="flex flex-col items-start">
        <div className="grid grid-cols-3">
          <div className="col-span-2 p-2">
            <p className="text-large font-bold">{route.name}</p>
            <p className="text-default-500">{route.description}</p>
            <h2 className="text-large font-bold">
              {route.distanceKm} Km ({route.distanceM} m), {route.difficulty}
            </h2>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <Image src="lakes.png"></Image>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
