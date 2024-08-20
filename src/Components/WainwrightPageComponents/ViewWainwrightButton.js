import { useState } from "react";
import { Button } from "@nextui-org/react";
import WainwrightForm from "./WainwrightForm";
import ViewWainrightLog from "../LogbookComponents/MyWainwrights/ViewWainwrightLog";

export default function ViewWainwrightButton({
  wainwright,
  fetchUserWainwrightData,
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
        className="bg-blue text-lg font-thin text-white"
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
          fetchUserWainwrightData={fetchUserWainwrightData}
        />
      ) : (
        userWainwright && (
          <div>
            <ViewWainrightLog
              fetchUserWainwrightData={fetchUserWainwrightData}
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
