import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function AppLayout() {
  return (
    <div>
      <NavBar />
      <div></div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
