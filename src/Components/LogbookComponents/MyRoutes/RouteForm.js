import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import formatDate, { difficulties } from "../../Utilities/utilityFuncsStats.js";
import { Button } from "@nextui-org/react";
import StarRating from "../../Utilities/StarRating.js";
import BasicTimeField from "../../Utilities/TimePicker.js";
import dayjs from "dayjs";
import useEditRouteLog from "../../Utilities/useEditLog.js";
import useCreateRouteLog from "../../Utilities/useCreateRouteLog.js";
import { useSelector } from "react-redux";

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

export default function RouteForm({
  formOpen,
  setFormOpen,
  type,
  route,
  userRoute,
}) {
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [duration, setDuration] = useState(dayjs().hour(0).minute(0));
  const [rating, setRating] = useState(5);

  const { EditRouteLog } = useEditRouteLog();
  const { CreateUserRouteLog } = useCreateRouteLog();

  const id = useSelector((state) => state.user.id);

  function handleSubmit(e) {
    e.preventDefault();
    //Prepare log for backend
    const updatedLog = {
      id,
      description,
      date: new Date(date).toISOString(),
      difficultyRating: difficulty,
      duration: new Date(duration).toISOString(),
      rating,
    };

    //If editing, get the same route ID from the route attribute of the userRoute
    if (type === "edit") {
      updatedLog.routeID = userRoute.route.routeID;
      try {
        EditRouteLog(updatedLog);
      } catch (error) {
        console.error(error, "EditLog failed");
      }
    } else if (type === "create") {
      updatedLog.routeID = route.routeID;
      try {
        CreateUserRouteLog(updatedLog);
      } catch (error) {
        console.error(error, "Create log failed");
      }
    }

    setFormOpen(false);
  }

  useEffect(() => {
    if (type === "edit" && userRoute) {
      setDescription(userRoute?.description || "");
      setDifficulty(userRoute?.difficultyRating || "");
      setDate(userRoute?.date || formatDate(new Date()));
      setDuration(dayjs(userRoute?.duration) || dayjs().hour(0).minute(0));
      setRating(userRoute?.rating || 5);
    } else {
      setDate(formatDate(new Date()));
      setDescription("");
      setDifficulty("");
      setDuration(dayjs().hour(0).minute(0));
      setRating(5);
    }
  }, [type, userRoute]);

  function handleClose() {
    setFormOpen(false);
  }

  return (
    <BootstrapDialog
      open={formOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
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
      >
        {type === "create" && `Record a log for ${route.name}?`}
        {type === "edit" &&
          userRoute &&
          `Edit log for ${userRoute.route.name}?`}
      </DialogTitle>
      <DialogContent dividers>
        <ul>
          <li className="mb-4">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Description
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ fontFamily: "poppins" }}
            />
          </li>

          {/* Difficulty */}
          <li className="mb-4 mt-5">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              How did it feel?
            </Typography>
            <FormControl fullWidth>
              <InputLabel sx={{ fontFamily: "poppins" }} id="difficulty-label">
                Difficulty
              </InputLabel>
              <Select
                labelId="difficulty-label"
                id="difficulty"
                value={difficulty}
                label="Difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
                sx={{ fontFamily: "poppins" }}
              >
                {difficulties.map((d, index) => (
                  <MenuItem defaultValue={difficulty} key={index} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </li>

          {/* Date */}
          <li className="mb-4 mt-2">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "poppins" }}
            >
              Date
            </Typography>
            <TextField
              type="date"
              value={formatDate(date)}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              variant="standard"
              sx={{ fontFamily: "poppins" }}
            />
          </li>

          {/* Duration */}
          <li className="mb-4 mt-2">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Duration
            </Typography>
            <BasicTimeField value={duration} setValue={setDuration} />
          </li>

          {/* Rating */}
          <li className="mb-1 mt-2">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mb: 1, fontFamily: "poppins" }}
            >
              Rating
            </Typography>
            <StarRating
              size={40}
              defaultRating={rating}
              onSetRating={setRating}
            />
          </li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button
          className="bg-mint font-poppins text-xl text-blue"
          onClick={handleClose}
          autoFocus
        >
          Cancel
        </Button>
        <Button
          className="bg-blue font-poppins text-xl text-white"
          type="submit"
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
