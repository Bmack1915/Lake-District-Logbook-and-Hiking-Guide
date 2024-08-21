import { Button, Card, CardHeader, Image } from "@nextui-org/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import timeConverter from "../Utilities/timeConverter";

export default function RouteViewCard({ route }) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/routeinfo/${route.routeID}`);
  }

  return (
    <Card className="p-1">
      <CardHeader className="flex flex-col items-start">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Image Section */}

          {/* Text Content Section */}
          <div className="space-y-2 md:col-span-2">
            <p className="text-lg font-bold">{route.name}</p>
            <p className="text-default-500">{route.description}</p>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {route.distanceKm} Km ({route.distanceM} mi), {route.difficulty}
              </h2>
              <p className="font-bold">
                Estimated Time {timeConverter(route.time)}
              </p>
              <Button
                endContent={<IoMdSend />}
                className="bg-lightblue"
                onPress={handleNavigate}
              >
                Route Info
              </Button>
            </div>
          </div>
          <div className="h-auto w-full object-cover md:col-span-1">
            <Image
              src="/Assets/lakeDistrict/ambleside.jpg"
              alt={route.name}
              className="h-auto w-full rounded-lg object-cover"
              width={1000}
              height={130}
            />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
