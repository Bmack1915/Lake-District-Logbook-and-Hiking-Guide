import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../Utilities/apiConfig";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../../materialUI/alertDialog";
import apiClient from "../../Utilities/axiosInterceptor";
import { Button } from "@nextui-org/react";
import { fetchUserData } from "../../../redux/userSlice";

function DeleteRouteDialog({ userRoute }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteAssociatedWainwrights, setDeleteAssociatedWainwrights] =
    useState(true);

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  async function handleConfirm(bool) {
    const url = bool
      ? `${API_BASE_URL}userroutes/deleteWainwrightsWithRoute/${userId}?routeID=${userRoute.route.routeID}`
      : `${API_BASE_URL}userroutes/${userId}?routeID=${userRoute.route.routeID}`;

    try {
      await apiClient.delete(url);
      dispatch(fetchUserData(userId));
    } catch (error) {
      console.error("Failed to delete the route:", error);
    } finally {
      setDialogOpen(() => false);
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
        className="font-poppins bg-red text-xl text-white"
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
