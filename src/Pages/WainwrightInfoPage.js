import { useParams } from "react-router-dom";
import { useWainwright } from "../Components/Utilities/useWainwright";
import { Loading } from "../Components/Utilities/Loading";

import WainwrightMap from "../Components/WainwrightPageComponents/WainwrightMap";
import WainwrightInfo from "../Components/WainwrightPageComponents/WainwrightInfo";
import { useUserWainwrights } from "../Components/Utilities/useUserWainwrights";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AssociatedRoutes from "../Components/WainwrightPageComponents/AssociatedRoutes";
import ViewWainwrightButton from "../Components/WainwrightPageComponents/ViewWainwrightButton";

function WainwrightInfoPage() {
  const [completed, setCompleted] = useState(false);
  const [loggedAscent, setLoggedAscent] = useState(null);
  // Get wainwright ID from URL
  const { id } = useParams();

  // Custom hook to fetch Wainwright

  const { wainwright, isLoadingWainwright } = useWainwright(id);
  const userId = useSelector((state) => state.user.id);
  const { userWainwrights, isLoading, fetchUserWainwrightData } =
    useUserWainwrights(userId);

  useEffect(() => {
    async function GetCompleted() {
      let isCompleted = false;
      let loggedAscent = null;

      if (wainwright && userWainwrights) {
        isCompleted = userWainwrights
          .map((uw) => uw.wainwright.name)
          .includes(wainwright.name);

        loggedAscent = userWainwrights.find(
          (uw) => uw.wainwright && uw.wainwright.name === wainwright.name,
        );
      }

      if (isCompleted) {
        setCompleted(true);
        setLoggedAscent(loggedAscent);
      }
    }

    GetCompleted();
  }, [wainwright, userWainwrights, isLoadingWainwright]);

  if (isLoading || isLoadingWainwright) return <Loading />;

  // if (!isLoadingWainwright) {
  //   return <Loading />;
  // }

  return (
    <div>
      <h1 className="mb-4 px-5 text-start text-4xl font-bold">
        {wainwright.name}
      </h1>
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="col-span-3 col-start-3 row-span-3 row-start-1">
          <WainwrightMap wainwright={wainwright} />
        </div>
        <div className="col-span-2 col-start-1 row-span-2 row-start-1">
          <WainwrightInfo
            wainwright={wainwright}
            completed={completed}
            setCompleted={setCompleted}
          >
            <ViewWainwrightButton
              fetchUserWainwrightData={fetchUserWainwrightData}
              userWainwright={loggedAscent}
              completed={completed}
              wainwright={wainwright}
            />
          </WainwrightInfo>
        </div>

        <div className="col-span-4 col-start-3 row-span-2 row-start-3">
          <AssociatedRoutes wainwright={wainwright} />
        </div>
      </div>
    </div>
  );
}

export default WainwrightInfoPage;
