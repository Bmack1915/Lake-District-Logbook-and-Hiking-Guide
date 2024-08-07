import React from "react";
import { Image } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Logout from "../Components/Authorization/Logout";

export default function NavBar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/routeFinder", label: "Route Finder" },
    { to: "/wainwrightFinder", label: "Wainwright Finder" },
    { to: "/logbook", label: "My Logbook" },
    { to: "/profile", label: "Profile" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="flex">
      <Image
        src="Assets/image copy 2.png"
        alt="Wainwright Logbook"
        height={100}
        width={200}
        className="object-contain"
      />
      <div className="flex flex-row items-center justify-evenly p-1 px-36 font-inconsolata">
        {links.map((link) => (
          <Link
            key={link.label}
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
