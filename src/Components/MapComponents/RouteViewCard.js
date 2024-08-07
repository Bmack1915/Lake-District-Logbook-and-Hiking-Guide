import { Card, CardHeader, Image } from "@nextui-org/react";
import * as React from "react";

export default function RouteViewCard({ route }) {
  return (
    <Card className="p-2">
      <CardHeader className="flex flex-col items-start">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 space-y-2">
            <p className="text-lg font-bold">{route.name}</p>
            <p className="text-default-500">{route.description}</p>
            <h2 className="text-lg font-bold">
              {route.distanceKm} Km ({route.distanceM} m), {route.difficulty}
            </h2>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <Image src="assets/lakes.png" className="h-auto max-w-full"></Image>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
