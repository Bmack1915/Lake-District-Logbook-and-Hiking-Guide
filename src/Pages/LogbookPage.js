import CompletedWainwrights from "../Components/LogbookComponents/CompletedWainwrights";
import LogbookWheel from "../Components/LogbookComponents/LogbookWheel";
import CompletedRoutes from "../Components/LogbookComponents/CompletedRoutes";

function Logbook() {
  return (
    <div>
      <div className="flex items-center justify-evenly">
        <LogbookWheel />
        <CompletedWainwrights />
        {/* <WainwrightViewCard /> */}
      </div>
      <CompletedRoutes />
    </div>
  );
}
export default Logbook;
