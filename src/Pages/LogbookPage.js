import CompletedWainwrightsTable from "../Components/LogbookComponents/MyWainwrights/CompletedWainwrightsTable";
import ProgressWheel from "../Components/LogbookComponents/LogbookWheel";
import { useSelector } from "react-redux";
import { useUserWainwrights } from "../Components/Utilities/useUserWainwrights";
import { ConfirmProvider } from "material-ui-confirm";
import SlideshowBackground from "../Components/HomePageComponents/SlideshowBackground";
import Oops from "../Components/LogbookComponents/Oops";
import CompletedRoutesTable from "../Components/LogbookComponents/MyRoutes/CompletedRoutesTable";
import { Loading } from "../Components/Utilities/Loading";

function Logbook() {
  const id = useSelector((state) => state.user.id);
  const { userWainwrights, isLoading, fetchUserWainwrightData } =
    useUserWainwrights(id);

  if (isLoading) return <Loading />;

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
                <ProgressWheel
                  userWainwrights={userWainwrights}
                  isLoading={isLoading}
                  fetchUserWainwrightData={fetchUserWainwrightData}
                />

                <div className="flex flex-col">
                  <CompletedWainwrightsTable
                    fetchUserWainwrightData={fetchUserWainwrightData}
                    userWainwrights={userWainwrights}
                  />
                  {/* <CompletedRoutesList
            fetchUserWainwrightData={fetchUserWainwrightData}
            /> */}
                </div>
              </div>
            </div>
          </SlideshowBackground>
        ) : (
          <SlideshowBackground>
            <Oops />
          </SlideshowBackground>
        )}
        <h1 className="flex justify-center p-4 pb-5 text-4xl font-bold">
          My Routes
        </h1>
        <CompletedRoutesTable />
      </ConfirmProvider>
    </div>
  );
}
export default Logbook;
