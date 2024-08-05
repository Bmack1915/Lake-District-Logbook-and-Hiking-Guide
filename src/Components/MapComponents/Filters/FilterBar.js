import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { CiBoxList } from "react-icons/ci";

export default function FilterBar() {
  return (
    <div className="flex flex-col">
      <Tabs fullWidth aria-label="Options" className="mb-5 w-full">
        <Tab key="photos" title="Map View" className="w-full"></Tab>
        <Tab key="music" title="List View"></Tab>
      </Tabs>
    </div>
  );
}
