import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../Utilities/apiConfig";
import { useState } from "react";
import axios from "axios";
import { UpdateUserInfo, deleteUserRoute } from "../../redux/userSlice";
import MyButton from "../materialUI/myButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../materialUI/alertDialog";

function DeleteRouteDialog({ userRoute }) {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.id);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteAssociatedWainwrights, setDeleteAssociatedWainwrights] =
    useState(true);

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  async function handleConfirm(bool) {
    const url = bool
      ? `${API_BASE_URL}userroutes/deleteWainwrightsWithRoute/${userID}?routeID=${userRoute.route.routeID}`
      : `${API_BASE_URL}userroutes/${userID}?routeID=${userRoute.route.routeID}`;

    try {
      const response = await axios.delete(url);
      console.log(response);
      // dispatch(deleteUserRoute(userID, userRoute.route.id));
      dispatch(UpdateUserInfo());
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
      <MyButton
        handleSubmit={handleDeleteClick}
        startIcon={<DeleteIcon />}
        size="small"
        variant="contained"
        color="error"
      >
        Delete
      </MyButton>
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
