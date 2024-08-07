import React, { useState } from "react";
import "../App.css";
import "../index.css";
import MapView from "../Components/MapComponents/Map/MainView";
import Sidebar from "../Components/MapComponents/Map/Sidebar";
import ResultsTypeBar from "../Components/MapComponents/Filters/List-MapTabs";
import ListView from "../Components/MapComponents/ListView";

function FinderMapPage({ type }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewType, setViewType] = useState("map");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <ResultsTypeBar viewType={viewType} setViewType={setViewType} />
      <div className="grid h-96 grid-cols-5">
        {viewType === "map" ? (
          <>
            {isSidebarOpen && (
              <div className="col-span-1">
                <Sidebar
                  type={type}
                  toggleSidebar={toggleSidebar}
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                  className="hidden md:block"
                />
              </div>
            )}
            <div className={isSidebarOpen ? "col-span-4" : "col-span-5"}>
              <MapView
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                type={type}
              />
            </div>
          </>
        ) : (
          <div className="col-span-5">
            <ListView type={type} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FinderMapPage;
