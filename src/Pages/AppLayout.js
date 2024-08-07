import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SessionChecker from "../Components/Authorization/SessionChecker";

function AppLayout() {
  return (
    <div>
      <NavBar />
      <SessionChecker>
        <Outlet />
      </SessionChecker>
    </div>
  );
}

export default AppLayout;
