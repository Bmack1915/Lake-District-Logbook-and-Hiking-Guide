import React from "react";
import { useSelector } from "react-redux";

export default function WainwrightViewCard() {
  const wainwrights = useSelector((state) => state.wainwright.wainwrights);
  return (
    <div>
      {wainwrights.map((w) => (
        <div
          key={w.wainwrightID}
          className="flex items-center rounded-lg border bg-white p-4 shadow-md"
        >
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900">{w.name}</h1>
            <h2 className="text-md text-gray-700">
              {w.heightM}m (Rank #{w.wainwrightID} in height)
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
