import { useSelector } from "react-redux";
import CompletedItems from "../Components/CompletedItems";

function Logbook() {
  const completedWainwrights = useSelector(
    (state) => state.user.userWainwrights,
  );
  const completedRoutes = useSelector((state) => state.user.userRoutes);

  return (
    <div className="flex items-center justify-evenly">
      <CompletedItems items={completedWainwrights} itemType="wainwrights" />
      <CompletedItems items={completedRoutes} itemType="routes" />
    </div>
  );
}
export default Logbook;
