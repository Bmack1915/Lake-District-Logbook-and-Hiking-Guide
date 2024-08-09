import React from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useUserWainwrights } from "../Utilities/useUserWainwrights";

export default function WainwrightViewCard({ wainwright }) {
  const id = useSelector((state) => state.user.id);
  const { userWainwrights } = useUserWainwrights(id);
  const wainwrightNames = userWainwrights.map((w) => w.name);

  const completed = wainwrightNames.includes(wainwright.name);

  return (
    <Card className="p-2">
      <CardHeader className="flex flex-col items-start">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 space-y-2">
            <p className="text-lg font-bold">{wainwright.name}</p>

            <h2 className="text-lg font-bold">{wainwright.heightM} metres</h2>
            {completed && <p>Completed ✅</p>}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <Image src="assets/lakes.png" className="h-auto max-w-full"></Image>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
