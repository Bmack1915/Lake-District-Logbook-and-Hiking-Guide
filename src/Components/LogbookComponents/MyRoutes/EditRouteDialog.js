import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MyButton from "../../materialUI/myButton.jsx";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { API_BASE_URL } from "../../Utilities/apiConfig.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiClient from "../../Utilities/axiosInterceptor.js";
import { useState } from "react";
import formatDate, { difficulties } from "../../Utilities/utilityFuncsStats.js";

export default function EditRouteDialog({ userRoute, fetchUserRouteData }) {
  const id = useSelector((state) => state.user.id);
  const routeID = userRoute.route.routeID;
  const [difficulty, setDifficulty] = useState(userRoute.difficultyRating);
  const [date, setDate] = useState(userRoute.date);
  const [description, setDescription] = useState(userRoute.description);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function EditLog(log) {
    const response = await apiClient.put(
      `${API_BASE_URL}userroutes/${id}?routeID=${routeID}`,
      log,
    );
    console.log("Response", response);
    fetchUserRouteData();
    toast.success("Log successfully updated!");

    if (response.status === 201 || response.state === 200) {
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const updatedLog = {
      id,
      routeID,
      description,
      date: new Date(date).toISOString(),
      DifficultyRating: difficulty,
    };

    EditLog(updatedLog);
    setDate(() => date);
    setDescription(() => description);
    setDifficulty(() => difficulty);
    setOpen(false);
  }

  return (
    <>
      <MyButton variant="contained" handleSubmit={handleClickOpen}>
        Edit
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>{userRoute.route.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to edit this route log from {""}
            {formatDate(userRoute.date)}?
          </DialogContentText>
          <ul>
            <li>
              <TextField
                autoFocus
                required
                margin="dense"
                label="Description"
                id="name"
                fullWidth
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </li>
            <li className="mt-5">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  How did it feel?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={difficulty}
                  label="Difficulty"
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  {difficulties.map((d) => (
                    <MenuItem value={d}>{d}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </li>
            <li className="mt-5 flex">
              <input
                type="date"
                value={formatDate(date)}
                onChange={(e) => setDate(e.target.value)}
              />
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <MyButton
            handleSubmit={handleSubmit}
            variant="contained"
            type="submit"
          >
            Save
          </MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
