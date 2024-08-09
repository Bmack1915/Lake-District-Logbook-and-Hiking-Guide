import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export default function ViewSelector({ viewType, setViewType }) {
  function handleTabChange(key) {
    setViewType(key);
  }

  return (
    <div className="bg-mint flex w-full flex-col">
      <Tabs
        variant="solid"
        fullWidth
        aria-label="Options"
        className="bg-mint mb-5 w-full"
        onSelectionChange={handleTabChange}
        value={viewType}
      >
        <Tab key="map" title="Map View" className="bg-mint w-full text-blue" />
        <Tab key="list" title="List View" className="bg-mint w-full" />
      </Tabs>
    </div>
  );
}
