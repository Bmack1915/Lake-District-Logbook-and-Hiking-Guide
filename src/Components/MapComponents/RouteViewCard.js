import { Button, Card, CardHeader, Image } from "@nextui-org/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSend } from "react-icons/io";

export default function RouteViewCard({ route }) {
  // All requests made with the client will be authenticated
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/routeinfo/${route.routeID}`);
  }

  return (
    <Card className="p-1">
      <CardHeader className="flex flex-col items-start">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 space-y-2">
            <p className="text-lg font-bold">{route.name}</p>
            <p className="text-default-500">{route.description}</p>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {route.distanceKm} Km ({route.distanceM} m), {route.difficulty}
              </h2>
              <Button
                endContent={<IoMdSend />}
                className="bg-lightblue"
                onPress={handleNavigate}
              >
                Route Info
              </Button>
            </div>
          </div>
          <div className="col-span-1 flex items-center justify-center px-5">
            <Image src="assets/image.png" className="h-auto max-w-full"></Image>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
