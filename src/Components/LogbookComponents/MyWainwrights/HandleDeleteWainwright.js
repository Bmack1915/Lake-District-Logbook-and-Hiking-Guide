import { Button } from "@nextui-org/react";
import useDeleteWainwright from "../../Utilities/useDeleteWainwright";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../../materialUI/alertDialog";
import { useState } from "react";

function HandleDeleteWainwright({
  fetchUserWainwrightData,
  setOpen,
  userWainwright,
}) {
  const { handleRemoveWainwright } = useDeleteWainwright(
    userWainwright.wainwright.wainwrightID,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    await handleRemoveWainwright();
    fetchUserWainwrightData();
    setOpen(false);
  };
  return (
    <div>
      <Button
        endContent={<DeleteIcon />}
        onPress={() => setDialogOpen(true)}
        className="bg-red text-white"
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
