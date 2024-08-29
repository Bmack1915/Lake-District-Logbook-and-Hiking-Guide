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

// Apply Bootstrap Dialog Styles
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

export default function WainrightLog({ userWainwright, open, setOpen }) {
  const [editOpen, setEditOpen] = useState(false);
  const { rating, description, duration, difficultyRating } = userWainwright;
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
            p: 3,
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.75rem",
            fontFamily: "poppins",
          }}
          id="customized-dialog-title"
        >
          <Typography
            variant="h6"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.75rem",
              fontFamily: "poppins",
            }}
          >
            {userWainwright.wainwright.name}{" "}
            {userWainwright.date && `Ascent on ${date}`}
          </Typography>
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
        <DialogContent dividers>
          {/* Description  */}
          <div className="mb-4">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Description
            </Typography>
            {description !== null ? (
              <Typography variant="body1">{description}</Typography>
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No description provided
              </Typography>
            )}
          </div>

          {/* Duration */}
          <div className="mb-4">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Duration
            </Typography>
            <Typography variant="body1">
              {duration
                ? `${dayjs(duration).format("HH:mm")}`
                : "No completion time provided"}
            </Typography>
          </div>

          {/* Difficulty  */}
          <div className="mb-4">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Difficulty Rating
            </Typography>
            {difficultyRating ? (
              <Typography variant="body1">{difficultyRating}</Typography>
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No difficulty rating provided
              </Typography>
            )}
          </div>

          {/* Rating  */}
          <div className="mb-4">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Rating
            </Typography>
            {rating !== null ? (
              <StarRating defaultRating={rating} disabled />
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No Rating provided
              </Typography>
            )}
          </div>
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
              className="bg-mint px-5 font-poppins text-xl text-blue"
              autoFocus
              onClick={handleEditClickOpen}
            >
              Edit Log
            </Button>

            <HandleDeleteWainwright
              setOpen={setOpen}
              userWainwright={userWainwright}
            />

            <Button
              className="bg-blue font-poppins text-xl text-white"
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
          userWainwright={userWainwright}
          setFormOpen={setEditOpen}
          formOpen={editOpen}
        />
      </BootstrapDialog>
    </div>
  );
}
