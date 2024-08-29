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
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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

function RouteLog({
  userRoute,
  open,
  setOpen,
  handleEditClickOpen,
  withNavigation = false,
}) {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  function handleNavigate() {
    navigate(`/routeinfo/${userRoute.route.routeID}`);
  }

  const { description, duration, date, difficultyRating, rating } = userRoute;
  const formattedDate = formatDate(userRoute.date);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="font-poppins"
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
            {userRoute.route.name} {userRoute.date && `on ${formattedDate}`}
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
              sx={{
                fontWeight: "bold",
                mb: 1,
                fontFamily: "poppins",
              }}
            >
              Description
            </Typography>
            {description ? (
              <Typography
                sx={{
                  maxWidth: "5000px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
                variant="body1"
              >
                {description}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No description provided
              </Typography>
            )}
          </div>
          {/* Date  */}
          <div className="mb-4">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Date Completed
            </Typography>
            {date ? (
              <Typography variant="body1">{formattedDate}</Typography>
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No completion date provided
              </Typography>
            )}
          </div>
          {/* Duration  */}
          <div className="mb-4">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Duration
            </Typography>
            {duration ? (
              <Typography variant="body1">
                {durationConverter(duration)}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No completion time provided
              </Typography>
            )}
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
          {/* Rating */}
          <div className="mb-4">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Rating
            </Typography>
            {rating ? (
              <StarRating size={36} disabled defaultRating={rating} />
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No rating provided
              </Typography>
            )}
          </div>
        </DialogContent>
        <div className="flex justify-center">
          <DialogActions>
            <Button
              className="bg-mint px-5 font-poppins text-xl text-blue"
              autoFocus
              onClick={handleEditClickOpen}
            >
              Edit Log
            </Button>
            <DeleteRouteDialog userRoute={userRoute} />
            {withNavigation && (
              <Button
                endContent={<IoMdSend />}
                className="bg-lightblue font-poppins text-xl"
                onPress={handleNavigate}
              >
                Route Info
              </Button>
            )}

            <Button
              className="bg-blue font-poppins text-xl text-white"
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

export default RouteLog;
