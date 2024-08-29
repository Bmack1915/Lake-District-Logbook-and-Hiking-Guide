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
        <div className="items-center px-2">
          <Link to="/">
            <Image
              src="Assets/mountainNobg.png"
              alt="Wainwright Logbook"
              height={70}
              width={150}
              className="mx-4 object-contain p-2"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-grow justify-center space-x-8 text-xl">
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
        <div className="px-5">{name && `Hello, ${name}`}</div>
        {token && token.length > 0 ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
}
