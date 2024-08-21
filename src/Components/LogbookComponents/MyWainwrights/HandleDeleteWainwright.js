import { Button, useDisclosure } from "@nextui-org/react";
import useDeleteWainwright from "../../Utilities/useDeleteWainwright";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../../materialUI/alertDialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../redux/userSlice";
import { toast } from "react-toastify";

function HandleDeleteWainwright({ setOpen, userWainwright }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const { handleRemoveWainwright } = useDeleteWainwright(
    userWainwright.wainwright.wainwrightID,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await handleRemoveWainwright();
      dispatch(fetchUserData(userId));
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete Wainwright. Please try again.");
    } finally {
      setDialogOpen(false);
    }
  };

  return (
    <div>
      <Button
        endContent={<DeleteIcon />}
        onPress={() => setDialogOpen(true)}
        className="bg-red font-inconsolata text-xl text-white"
      >
        Delete
      </Button>
      <AlertDialog
        open={dialogOpen}
        title="Confirm Deletion"
        message="Would you like to remove this Wainwright from your logbook?"
        onConfirm={handleDelete}
        onDecline={() => setDialogOpen(false)}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  );
}

export default HandleDeleteWainwright;
