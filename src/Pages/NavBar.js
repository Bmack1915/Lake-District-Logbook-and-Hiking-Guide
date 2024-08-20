import { Image } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../Components/Authorization/LogoutButton";
import LoginButton from "../Components/Authorization/LoginButton";
import { useSelector } from "react-redux";

export default function NavBar() {
  const { token, name } = useSelector((state) => state.user);

  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
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
        <div className="px-5">{name && `Hello ${name}`}</div>
        {token && token.length > 0 ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
}
