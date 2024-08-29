import { useState } from "react";
import { Button } from "@nextui-org/react";

import RouteForm from "./RouteForm";
import RouteLog from "./RouteLog";

export default function ViewRouteButton({ userRoute }) {
  const [editOpen, setEditOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        className="text-black bg-lightblue text-lg"
        onPress={handleClickOpen}
      >
        Open
      </Button>
      <RouteLog
        withNavigation={true}
        handleEditClickOpen={handleEditClickOpen}
        setOpen={setOpen}
        open={open}
        userRoute={userRoute}
      />
      <RouteForm
        formOpen={editOpen}
        type="edit"
        userRoute={userRoute}
        setFormOpen={setEditOpen}
      />
    </div>
  );
}
