import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export default function ViewSelector({ viewType, setViewType }) {
  function handleTabChange(key) {
    setViewType(key);
  }

  return (
    <div className="flex w-full flex-col pb-2 pt-5">
      <Tabs
        variant="solid"
        fullWidth
        aria-label="Options"
        className="mb-5 w-full"
        onSelectionChange={handleTabChange}
        value={viewType}
      >
        <Tab key="map" title="Map View" className="w-full text-2xl text-blue" />
        <Tab key="list" title="List View" className="w-full text-2xl" />
      </Tabs>
    </div>
  );
}
