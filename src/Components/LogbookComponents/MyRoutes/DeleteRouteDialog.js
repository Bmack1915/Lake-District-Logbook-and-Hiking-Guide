import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../Utilities/apiConfig";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../../materialUI/alertDialog";
import apiClient from "../../Utilities/axiosInterceptor";
import { Button } from "@nextui-org/react";
import { useUserRoutes } from "../../Utilities/useUserRoutes";
import { useUserWainwrights } from "../../Utilities/useUserWainwrights";

function DeleteRouteDialog({ userRoute }) {
  const userID = useSelector((state) => state.user.id);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteAssociatedWainwrights, setDeleteAssociatedWainwrights] =
    useState(true);

  const { fetchUserRouteData } = useUserRoutes(userID);
  const { fetchUserWainwrightData } = useUserWainwrights(userID);

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  async function handleConfirm(bool) {
    const url = bool
      ? `${API_BASE_URL}userroutes/deleteWainwrightsWithRoute/${userID}?routeID=${userRoute.route.routeID}`
      : `${API_BASE_URL}userroutes/${userID}?routeID=${userRoute.route.routeID}`;

    try {
      await apiClient.delete(url);
      fetchUserRouteData();
      fetchUserWainwrightData();
    } catch (error) {
      console.error("Failed to delete the route:", error);
    } finally {
      setDialogOpen(false);
    }
  }

  const handleDecline = () => {
    const bool = setDeleteAssociatedWainwrights((bool) => !bool);
    handleConfirm(bool);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Button
        endContent={<DeleteIcon />}
        onPress={handleDeleteClick}
        className="bg-red text-white"
      >
        Delete
      </Button>
      <AlertDialog
        open={dialogOpen}
        title="Confirm Deletion"
        message="Would you like to remove the Wainwrights associated with this walk from your logbook?"
        onConfirm={handleConfirm}
        onDecline={handleDecline}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default DeleteRouteDialog;
