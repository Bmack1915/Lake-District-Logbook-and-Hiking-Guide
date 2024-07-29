import CompletedWainwrights from "../Components/LogbookComponents/CompletedWainwrights";
import LogbookWheel from "../Components/LogbookComponents/LogbookWheel";
import CompletedRoutesList from "../Components/LogbookComponents/CompletedRoutesList";

function Logbook() {
  return (
    <div>
      <div className="flex justify-evenly">
        <LogbookWheel />
        <CompletedWainwrights />
      </div>
      <CompletedRoutesList />
    </div>
  );
}
export default Logbook;
