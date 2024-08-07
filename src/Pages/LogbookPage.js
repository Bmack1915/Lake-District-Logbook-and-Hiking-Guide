import CompletedWainwrights from "../Components/LogbookComponents/CompletedWainwrights";
import CompletedRoutesList from "../Components/LogbookComponents/CompletedRoutesList";
import ProgressWheel from "../Components/LogbookComponents/LogbookWheel";
import { useSelector } from "react-redux";
import { useUserWainwrights } from "../Components/Utilities/useUserWainwrights";

function Logbook() {
  const id = useSelector((state) => state.user.id);
  const { userWainwrights, isLoading, fetchUserWainwrightData } =
    useUserWainwrights(id);
  return (
    <div>
      <h1 className="flex justify-center text-3xl">My Wainwrights</h1>
      <ProgressWheel
        userWainwrights={userWainwrights}
        isLoading={isLoading}
        fetchUserWainwrightData={fetchUserWainwrightData}
      />
      ;
      <CompletedRoutesList />
    </div>
  );
}
export default Logbook;
