import React from "react";
import RouteFilters from "../Filters/RouteFilters";
import WainwrightFilters from "../Filters/WainwrightFilters";

function Sidebar({ toggleSidebar, isSidebarOpen, type }) {
  return (
    <div>
      <div
        id="drawer-navigation"
        className={`bg-white dark:bg-gray-800 fixed left-0 top-0 z-40 mt-36 w-64 transform overflow-y-auto p-4 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
        style={{ height: "calc(100vh - 12rem)" }} // Adjust the height to fit your layout
      >
        <h5
          id="drawer-navigation-label"
          className="text-gray-500 dark:text-gray-400 p-4 text-base font-semibold uppercase"
        >
          Filters
        </h5>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white absolute right-2.5 top-2.5 inline-flex items-center rounded-lg p-1.5 text-sm"
        >
          <svg
            aria-hidden="true"
            className="mt-4 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        {type === "routes" && <RouteFilters />}
        {type === "wainwrights" && <WainwrightFilters />}
      </div>
    </div>
  );
}

export default Sidebar;
