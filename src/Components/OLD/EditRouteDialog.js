import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { API_BASE_URL } from "../Utilities/apiConfig.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiClient from "../Utilities/axiosInterceptor.js";
import { useState } from "react";
import formatDate, { difficulties } from "../Utilities/utilityFuncsStats.js";
import { Button } from "@nextui-org/react";
import StarRating from "../Utilities/StarRating.js";
import BasicTimeField from "../Utilities/TimePicker.js";
import dayjs from "dayjs";

export default function EditRouteDialog({
  userRoute,
  fetchUserRouteData,
  editOpen,
  setEditOpen,
}) {
  const id = useSelector((state) => state.user.id);
  const routeID = userRoute.route.routeID;

  // State for all attributes
  const [description, setDescription] = useState(userRoute.description);
  const [difficulty, setDifficulty] = useState(userRoute.difficultyRating);
  const [date, setDate] = useState(userRoute.date);
  const [duration, setDuration] = useState(dayjs(userRoute.duration));
  const [rating, setRating] = useState(userRoute.rating);

  const handleClose = () => {
    setEditOpen(false);
  };

  async function EditLog(log) {
    const response = await apiClient.put(
      `${API_BASE_URL}userroutes/${id}?routeID=${routeID}`,
      log,
    );

    fetchUserRouteData();
    toast.success("Log successfully updated!");

    if (response.status === 201 || response.state === 200) {
      // Handle success
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updatedLog = {
      id,
      routeID,
      description,
      date: new Date(date).toISOString(),
      difficultyRating: difficulty,
      duration,
      rating,
    };

    EditLog(updatedLog);
    setEditOpen(false);
  }

  return (
    <>
      <Dialog
        open={editOpen}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit, // Form submission handler
        }}
      >
        <DialogTitle className="bg-blue text-white">
          Editing: {userRoute.route.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="pt-4">
            Would you like to edit this route log from{" "}
            {formatDate(userRoute.date)}?
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
