import EditRouteDialog from "../../OLD/EditRouteDialog";
import DeleteRouteDialog from "./DeleteRouteDialog";
import CompletedUserRouteInfo from "../../OLD/CompletedUserRouteInfo";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

function CompletedRouteCard({
  userRoute,
  fetchUserRouteData,
  fetchUserWainwrightData,
}) {
  const navigate = useNavigate();

  function handleViewClick() {
    navigate(`/routeinfo/${userRoute.routeID}`);
  }
  return (
    <div className="flex space-x-4 overflow-x-auto">
      <CompletedUserRouteInfo userRoute={userRoute} />
      <div className="flex flex-col justify-evenly">
        <Button onPress={handleViewClick} className="bg-lightblue">
          View
        </Button>
        <EditRouteDialog
          fetchUserRouteData={fetchUserRouteData}
          userRoute={userRoute}
        >
          Edit
        </EditRouteDialog>
        <DeleteRouteDialog
          userRoute={userRoute}
          fetchUserRouteData={fetchUserRouteData}
          fetchUserWainwrightData={fetchUserWainwrightData}
        >
          Delete
        </DeleteRouteDialog>
      </div>
    </div>
  );
}

export default CompletedRouteCard;
