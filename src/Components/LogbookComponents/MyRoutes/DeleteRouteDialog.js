import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialogWindow from "../DeleteDialogWindow";
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
      ? `${process.env.REACT_APP_API_BASE_URL}userroutes/deleteWainwrightsWithRoute/${userId}?routeID=${userRoute.route.routeID}`
      : `${process.env.REACT_APP_API_BASE_URL}userroutes/${userId}?routeID=${userRoute.route.routeID}`;

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
        className="bg-red font-poppins text-xl text-white"
      >
        Delete
      </Button>
      <DeleteDialogWindow
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
