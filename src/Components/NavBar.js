import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Authorization/Logout";
import Cookies from "js-cookie";
const Navbar = () => {
  return (
    <nav className="border-gray-200 bg-white text-xl dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link to="/">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="./mountain.png" className="h-8" alt="Wainwright Logo" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold tracking-widest dark:text-white">
              Wainwright Logbook
            </span>
          </div>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <Link
                to="/"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/logbook"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Logbook
              </Link>
            </li>
            <li>
              <Link
                to="/route-finder"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Route Finder
              </Link>
            </li>
            <li>
              <Link
                to="/wainwrights"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Wainwrights
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Contact
              </Link>
            </li>
            <li>
              {!Cookies.get("token") ? (
                <Link
                  to="/login"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Login
                </Link>
              ) : (
                <div className="rounded bg-red-300">
                  <Logout />
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
