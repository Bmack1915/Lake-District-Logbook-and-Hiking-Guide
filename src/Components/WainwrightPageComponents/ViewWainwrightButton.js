import { useState } from "react";
import { Button } from "@nextui-org/react";
import WainwrightForm from "./WainwrightForm";
import ViewWainrightLog from "../LogbookComponents/MyWainwrights/ViewWainwrightLog";

export default function ViewWainwrightButton({
  wainwright,
  userWainwright,
  completed,
}) {
  const [formOpen, setFormOpen] = useState(false);

  const handleClickOpen = () => {
    setFormOpen(true);
  };

  return (
    <div>
      <Button
        className="text-black bg-lightblue text-lg"
        onPress={handleClickOpen}
      >
        {!completed ? "Mark Complete" : "View Log"}
      </Button>
      {!completed ? (
        <WainwrightForm
          wainwright={wainwright}
          setFormOpen={setFormOpen}
          type="create"
          userWainwright={userWainwright}
          formOpen={formOpen}
        />
      ) : (
        userWainwright && (
          <div>
            <ViewWainrightLog
              open={formOpen}
              setOpen={setFormOpen}
              wainwright={wainwright}
              userWainwright={userWainwright}
            />
          </div>
        )
      )}
    </div>
  );
}
