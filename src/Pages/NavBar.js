import { Image } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../Components/Authorization/LogoutButton";
import LoginButton from "../Components/Authorization/LoginButton";
import { useSelector } from "react-redux";

export default function NavBar() {
  const token = useSelector((state) => state.user.token);
  const location = useLocation();

  const links = [
    { to: "/home", label: "Home" },
    { to: "/wainwrightFinder", label: "My Wainwrights" },
    { to: "/logbook", label: "My Logbook" },
    { to: "/routeFinder", label: "Route Finder" },
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
        {!token.length > 0 ? <LoginButton /> : <LogoutButton />}
      </div>
    </nav>
  );
}
