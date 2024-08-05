import CompletedWainwrights from "../Components/LogbookComponents/CompletedWainwrights";
import CompletedRoutesList from "../Components/LogbookComponents/CompletedRoutesList";
import ProgressWheel from "../Components/LogbookComponents/LogbookWheel";

function Logbook() {
  return (
    <div>
      <h1 className="flex justify-center text-3xl">My Wainwrights</h1>
      <ProgressWheel />;
    </div>
  );
}
export default Logbook;
