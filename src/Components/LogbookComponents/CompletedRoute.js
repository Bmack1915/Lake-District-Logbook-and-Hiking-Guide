import React, { useState } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_BASE_URL } from "../Utilities/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserInfo, deleteUserRoute } from "../../redux/userSlice";
import AlertDialog from "../materialUI/alertDialog";
import MyButton from "../materialUI/myButton";
import FormDialog from "../materialUI/FormDialog";

function CompletedRoute({ userRoute }) {
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
      dispatch(deleteUserRoute(userID, userRoute.route.id));
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
    <div className="flex space-x-4 overflow-x-auto">
      <div
        key={userRoute.route.id}
        className="w-80 rounded-lg bg-white p-4 shadow-md"
      >
        <div class="flex items-center space-x-4">
          <h2 class="text-lg font-semibold">{userRoute.route.name}</h2>
          <p class="flex-grow text-gray-600">{userRoute.route.description}</p>
        </div>

        <p className="text-gray-600">"{userRoute.description}"</p>
        <p className="text-gray-500">
          {new Date(userRoute.date).toLocaleDateString()}
        </p>
        <p className="text-gray-500">{userRoute.route.difficulty}</p>
      </div>
      <div className="flex flex-col justify-evenly">
        <MyButton color="success" variant="contained">
          View
        </MyButton>
        <FormDialog userRoute={userRoute} open="true">
          Edit
        </FormDialog>

        {/* <MyButton variant="contained">Edit</MyButton> */}
        <MyButton
          handleSubmit={handleDeleteClick}
          startIcon={<DeleteIcon />}
          size="small"
          variant="contained"
          color="error"
        >
          Delete
        </MyButton>
      </div>
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

CompletedRoute.propTypes = {
  userRoute: PropTypes.object.isRequired,
};

export default CompletedRoute;
