import { useState } from "react";
import { Button } from "@nextui-org/react";
import WainwrightForm from "./WainwrightForm";
import WainrightLog from "../LogbookComponents/MyWainwrights/WainwrightLog";

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
            <WainrightLog
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
