import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SessionChecker from "../Components/Authorization/SessionChecker";

function AppLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
