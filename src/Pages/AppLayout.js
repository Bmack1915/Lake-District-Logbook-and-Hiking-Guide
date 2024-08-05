import { Outlet } from "react-router-dom";
import NavBar2 from "../Components/NavBar2";

function AppLayout() {
  return (
    <div>
      <NavBar2 />
      <div></div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
