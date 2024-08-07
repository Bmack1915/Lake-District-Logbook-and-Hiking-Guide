import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export default function ResultsTypeBar({ viewType, setViewType }) {
  function handleTabChange(key) {
    setViewType(key);
  }

  return (
    <div className="flex w-full flex-col">
      <Tabs
        fullWidth
        aria-label="Options"
        className="mb-5 w-full"
        onSelectionChange={handleTabChange}
        value={viewType}
      >
        <Tab key="map" title="Map View" className="w-full" />
        <Tab key="list" title="List View" className="w-full" />
      </Tabs>
    </div>
  );
}
