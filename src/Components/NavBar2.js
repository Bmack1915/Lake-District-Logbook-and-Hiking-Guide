import React from "react";
import { Image } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Authorization/Logout";

export default function NavBar2() {
  const location = useLocation();

  const links = [
    { to: "/landing", label: "Home" },
    { to: "/routeFinder", label: "Route Finder" },
    { to: "/wainwrightFinder", label: "Wainwright Finder" },
    { to: "/logbook", label: "My Logbook" },
    { to: "/profile", label: "Profile" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="pb-5">
      <div className="flex justify-center">
        <Image
          src="wainwrightLogbook.png"
          alt="Wainwright Logbook"
          height={100}
          width={200}
        />
      </div>
      <div className="font-inconsolata flex flex-row justify-center p-1">
        {links.map((link) => (
          <Link
            className={
              location.pathname === link.to
                ? "border-spacing-1 px-5 font-bold"
                : "px-5 hover:font-bold"
            }
            to={link.to}
          >
            {link.label}
          </Link>
        ))}
        <Logout />
      </div>
    </nav>
  );
}
