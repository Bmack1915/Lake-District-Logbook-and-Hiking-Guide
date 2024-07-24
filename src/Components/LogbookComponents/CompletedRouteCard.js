import MyButton from "../materialUI/myButton";
import EditRouteDialog from "./EditRouteDialog";
import DeleteRouteDialog from "./DeleteRouteDialog";
import UserRouteInfo from "./UserRouteInfo";
import { useNavigate } from "react-router-dom";

function CompletedRouteCard({ userRoute }) {
  function handleViewClick() {
    navigate("/routeinfo");
  }
  const navigate = useNavigate();
  return (
    <div className="flex space-x-4 overflow-x-auto">
      <UserRouteInfo userRoute={userRoute} />
      <div className="flex flex-col justify-evenly">
        <MyButton
          handleSubmit={handleViewClick}
          color="success"
          variant="contained"
        >
          View
        </MyButton>
        <EditRouteDialog userRoute={userRoute}>Edit</EditRouteDialog>
        <DeleteRouteDialog userRoute={userRoute}>Delete</DeleteRouteDialog>
      </div>
    </div>
  );
}

export default CompletedRouteCard;
