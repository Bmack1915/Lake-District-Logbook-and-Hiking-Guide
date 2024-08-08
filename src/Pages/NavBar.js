import React from "react";
import { Image } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../Components/Authorization/LogoutButton";
import LoginButton from "../Components/Authorization/LoginButton";

export default function NavBar() {
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  const links = [
    { to: "/home", label: "Home" },
    { to: "/wainwrightFinder", label: "Wainwrights" },
    { to: "/routeFinder", label: "Route Finder" },
    { to: "/logbook", label: "My Logbook" },
  ];

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="Assets/wainwrightLogbook.png"
          alt="Wainwright Logbook"
          height={100}
          width={200}
          className="object-contain"
        />
      </div>
      <div className="flex flex-grow justify-center space-x-8">
        {links.map((link) => (
          <Link
            key={link.label}
            className={
              location.pathname === link.to
                ? "border-black border-b-2 px-5 font-bold"
                : "px-5 hover:font-bold"
            }
            to={link.to}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="mx-16 flex items-center">
        {!token ? <LoginButton /> : <LogoutButton />}
      </div>
    </nav>
  );
}
