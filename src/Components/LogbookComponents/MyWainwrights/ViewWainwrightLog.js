import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import WainwrightForm from "../../WainwrightPageComponents/WainwrightForm";
import formatDate from "../../Utilities/utilityFuncsStats";
import StarRating from "../../Utilities/StarRating";
import HandleDeleteWainwright from "./HandleDeleteWainwright";
import dayjs from "dayjs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ViewWainrightLog({
  userWainwright,
  fetchUserWainwrightData,
  open,
  setOpen,
}) {
  const [editOpen, setEditOpen] = useState(false);
  const { rating, description, duration, routeName, difficultyRating } =
    userWainwright;
  console.log(routeName, userWainwright);
  const wainwright = userWainwright.wainwright;
  const date = formatDate(userWainwright.date);

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            width: 500,
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: "bold",
          }}
          id="customized-dialog-title"
        >
          {userWainwright.wainwright.name} Ascent{" "}
          {userWainwright.date && <p className="text-sm">on {date}</p>}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            backgroundColor: "background.default",
            color: "text.primary",
          }}
        >
          <Typography gutterBottom>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Description</h2>

              {description !== null ? (
                <p>{description}</p>
              ) : (
                <p className="italic">No description provided</p>
              )}
            </div>
          </Typography>
          <Typography gutterBottom>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Duration</h2>
              <p className={!duration && "italic"}>
                {duration
                  ? `${dayjs(duration).format("HH:mm")}`
                  : "No completion time provided"}
              </p>
            </div>
          </Typography>

          <Typography sx={{ fontFamily: "inconsolata" }} gutterBottom>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Difficulty Rating</h2>
              <p className={!difficultyRating && "italic"}>
                {difficultyRating
                  ? `${difficultyRating}`
                  : "No difficulty rating provided"}
              </p>
            </div>
          </Typography>
          <Typography gutterBottom>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Route</h2>
              <p className={!routeName && "italic"}>
                {routeName ? routeName : "No Route Specified"}
              </p>
            </div>
          </Typography>
          <Typography gutterBottom>
            {rating !== null ? (
              <StarRating defaultRating={rating} disabled />
            ) : (
              <p className="italic">No Rating provided</p>
            )}
          </Typography>
        </DialogContent>
        <div className="flex justify-center">
          <DialogActions
            sx={{
              backgroundColor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              className="bg-mint px-5 text-blue"
              autoFocus
              onClick={handleEditClickOpen}
            >
              Edit Log
            </Button>

            <HandleDeleteWainwright
              fetchUserWainwrightData={fetchUserWainwrightData}
              setOpen={setOpen}
              userWainwright={userWainwright}
            />

            <Button
              className="bg-blue text-white"
              autoFocus
              onClick={handleClose}
            >
              Done
            </Button>
          </DialogActions>
        </div>
        <WainwrightForm
          wainwright={wainwright}
          type="edit"
          fetchUserWainwrightData={fetchUserWainwrightData}
          userWainwright={userWainwright}
          setFormOpen={setEditOpen}
          formOpen={editOpen}
        />
      </BootstrapDialog>
      <div></div>
    </div>
  );
}
