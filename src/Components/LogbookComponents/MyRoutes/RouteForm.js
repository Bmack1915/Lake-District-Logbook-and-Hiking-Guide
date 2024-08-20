import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useEffect, useState } from "react";
import formatDate, { difficulties } from "../../Utilities/utilityFuncsStats.js";
import { Button } from "@nextui-org/react";
import StarRating from "../../Utilities/StarRating.js";
import BasicTimeField from "../../Utilities/TimePicker.js";
import dayjs from "dayjs";
import useEditRouteLog from "../../Utilities/useEditLog.js";
import useCreateRouteLog from "../../Utilities/useCreateRouteLog.js";
import { useSelector } from "react-redux";
export default function RouteForm({ userRoute, formOpen, setFormOpen, type }) {
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [duration, setDuration] = useState(dayjs().hour(1).minute(0));
  const [rating, setRating] = useState(5);

  const { EditRouteLog, isLoading } = useEditRouteLog();
  const { CreateUserRouteLog } = useCreateRouteLog();
  const id = useSelector((state) => state.user.id);
  console.log(userRoute.route, "route");

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const updatedLog = {
      id,
      routeID: userRoute.route.routeID,
      description,
      date: new Date(date).toISOString(),
      difficultyRating: difficulty,
      duration: new Date(duration).toISOString(),
      rating,
    };

    if (type === "edit") {
      try {
        EditRouteLog(updatedLog);
      } catch (error) {
        console.error(error, "EditLog failed");
      }
    } else if (type === "create") {
      try {
        CreateUserRouteLog(updatedLog);
      } catch (error) {
        console.error(error, "Create log failed");
      }
    }

    setFormOpen(false);
  }

  // Initialize state based on the mode (edit or create)
  useEffect(() => {
    if (type === "edit" && userRoute) {
      // Ensure userRoute is not null before accessing properties
      setDescription(userRoute?.description || "");
      setDifficulty(userRoute?.difficulty || "");
      setDate(userRoute?.date || formatDate(new Date()));
      setDuration(dayjs(userRoute?.duration) || dayjs().hour(1).minute(0));
      setRating(userRoute?.rating || 5);
    } else {
      // Reset form fields for create mode
      setDate(formatDate(new Date()));
      setDescription("");
      setDifficulty("");
      setDuration(dayjs().hour(1).minute(0));
      setRating(5);
    }
  }, [type, userRoute]);

  function handleClose() {
    setFormOpen(false);
  }

  return (
    <>
      <Dialog
        open={formOpen}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle className="bg-blue text-white">
          {type === "create" && `Record a log for ${userRoute.route.name}?`}
          {type === "edit" &&
            userRoute &&
            `Edit log for ${userRoute.route.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="pt-4">
            {type === "create" && `Enter the details of your hike below`}
            {type === "edit" && `Edit details of your hike below`}
          </DialogContentText>
          <ul>
            <li>
              <TextField
                autoFocus
                margin="dense"
                label="Description"
                id="description"
                fullWidth
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </li>
            <li className="mt-5">
              <FormControl fullWidth>
                <InputLabel id="difficulty-label">How did it feel?</InputLabel>
                <Select
                  labelId="difficulty-label"
                  id="difficulty"
                  value={difficulty}
                  label="Difficulty"
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  {difficulties.map((d, index) => (
                    <MenuItem key={index} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </li>
            <li className="mt-5">
              <TextField
                type="date"
                label="Date"
                value={formatDate(date)}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                variant="standard"
              />
            </li>
            <li className="mt-5">
              <InputLabel
                id="demo-simple-select-label"
                sx={{ color: "text.secondary", paddingBottom: 2 }}
              >
                How long did this route take you?
              </InputLabel>
              <BasicTimeField value={duration} setValue={setDuration} />
            </li>
            <li className="mt-5">
              <InputLabel
                id="demo-simple-select-label"
                sx={{ color: "text.secondary" }}
              >
                How would you rate this route?
              </InputLabel>
              <StarRating
                className="pt-3"
                size={40}
                defaultRating={rating}
                onSetRating={setRating}
              />
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button className="bg-mint text-blue" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="bg-blue text-white" type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
