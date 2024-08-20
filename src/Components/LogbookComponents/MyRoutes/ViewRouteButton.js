import { useState } from "react";
import { Button } from "@nextui-org/react";

import RouteForm from "./RouteForm";
import ViewRouteLog from "./ViewRouteLog";

export default function ViewRouteButton({ userRoute, fetchUserRouteData }) {
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
        className="bg-blue text-lg font-thin text-white"
        onPress={handleClickOpen}
      >
        Open
      </Button>
      <ViewRouteLog
        fetchUserRouteData={fetchUserRouteData}
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
