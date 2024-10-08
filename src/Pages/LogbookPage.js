import CompletedWainwrightsTable from "../Components/LogbookComponents/MyWainwrights/CompletedWainwrightsTable";
import ProgressWheel from "../Components/LogbookComponents/LogbookWheel";
import { useSelector } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";
import SlideshowBackground from "../Components/HomePageComponents/SlideshowBackground";
import Oops from "../Components/LogbookComponents/Oops";
import CompletedRoutesTable from "../Components/LogbookComponents/MyRoutes/CompletedRoutesTable";

function Logbook() {
  const userWainwrights = useSelector((state) => state.user.userWainwrights);
  const userRoutes = useSelector((state) => state.user.userRoutes);

  return (
    <div>
      <ConfirmProvider>
        {userWainwrights.length > 0 ? (
          <SlideshowBackground opacity={0.25}>
            <div>
              <h1 className="flex justify-center p-4 pb-5 text-4xl font-bold">
                My Progress
              </h1>
              <div className="flex">
                <ProgressWheel />
                <div className="flex flex-col px-12">
                  <CompletedWainwrightsTable />
                </div>
              </div>
            </div>
          </SlideshowBackground>
        ) : (
          <SlideshowBackground>
            <Oops />
          </SlideshowBackground>
        )}
        {userRoutes && userRoutes.length > 0 && (
          <div>
            <h1 className="flex justify-center p-4 pb-5 text-4xl font-bold">
              My Routes
            </h1>
            <CompletedRoutesTable userRoutes={userRoutes} />
          </div>
        )}
      </ConfirmProvider>
    </div>
  );
}
export default Logbook;
