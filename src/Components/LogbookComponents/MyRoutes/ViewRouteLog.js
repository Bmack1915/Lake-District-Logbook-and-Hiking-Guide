import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Button } from "@nextui-org/react";
import formatDate from "../../Utilities/utilityFuncsStats";
import durationConverter from "../../Utilities/durationConverter";
import StarRating from "../../Utilities/StarRating";
import DeleteRouteDialog from "./DeleteRouteDialog";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function ViewRouteLog({
  userRoute,
  open,
  setOpen,
  handleEditClickOpen,
  fetchUserRouteData,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const { description, duration, date, difficultyRating, rating } = userRoute;
  const formattedDate = formatDate(userRoute.date);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="font-inconsolata"
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            width: 1000,
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: "bold",
            fontFamily: "inconsolata",
          }}
          id="customized-dialog-title"
        >
          {userRoute.route.name}
          {userRoute.date && <p className="text-sm">on {formattedDate}</p>}
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
          {/* Description Section */}
          <Typography sx={{ fontFamily: "inconsolata" }} gutterBottom>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Date Completed</h2>
              {date !== null ? (
                <p>{formattedDate}</p>
              ) : (
                <p className="italic">No completion date provided</p>
              )}
            </div>
          </Typography>

          {/* Description Section */}
          <Typography sx={{ fontFamily: "inconsolata" }} gutterBottom>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Description</h2>
              {description !== "" ? (
                <p>{description}</p>
              ) : (
                <p className="italic">No description provided</p>
              )}
            </div>
          </Typography>

          {/* Duration Section */}
          <Typography sx={{ fontFamily: "inconsolata" }} gutterBottom>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Duration</h2>
              <p className={!duration && "italic"}>
                {duration
                  ? `${durationConverter(duration)}`
                  : "No completion time provided"}
              </p>
            </div>
          </Typography>

          {/* Difficulty Rating Section */}
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

          {/* Rating Section */}
          <Typography sx={{ fontFamily: "inconsolata" }} gutterBottom>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Rating</h2>
              <p className={!rating && "italic"}>
                {rating ? (
                  <StarRating size={36} disabled defaultRating={rating} />
                ) : (
                  "No rating provided"
                )}
              </p>
            </div>
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
            <DeleteRouteDialog
              fetchUserRouteData={fetchUserRouteData}
              userRoute={userRoute}
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
      </BootstrapDialog>
    </div>
  );
}

export default ViewRouteLog;
