import CompletedWainwrights from "../Components/LogbookComponents/MyWainwrights/CompletedWainwrights";
import CompletedRoutesList from "../Components/LogbookComponents/MyRoutes/CompletedRoutesList";
import ProgressWheel from "../Components/LogbookComponents/LogbookWheel";
import { useSelector } from "react-redux";
import { useUserWainwrights } from "../Components/Utilities/useUserWainwrights";

function Logbook() {
  const id = useSelector((state) => state.user.id);
  const { userWainwrights, isLoading, fetchUserWainwrightData } =
    useUserWainwrights(id);
  return (
    <div>
      <h1 className="flex justify-center p-5 text-3xl">My Wainwrights</h1>
      <div className="flex">
        <ProgressWheel
          userWainwrights={userWainwrights}
          isLoading={isLoading}
          fetchUserWainwrightData={fetchUserWainwrightData}
        />

        {/* <CompletedRoutesList fetchUserWainwrightData={fetchUserWainwrightData} /> */}
        <div className="flex flex-col">
          <CompletedWainwrights userWainwrights={userWainwrights} />
          <CompletedRoutesList />
        </div>
      </div>
    </div>
  );
}
export default Logbook;
