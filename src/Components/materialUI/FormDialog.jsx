import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MyButton from "./myButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { difficulties } from "../Utilities/difficulties";
import axios from "axios";
import { API_BASE_URL } from "../Utilities/apiConfig";
import { useSelector } from "react-redux";

export default function FormDialog({ children, userRoute }) {
  const id = useSelector((state) => state.user.id);
  const routeID = userRoute.route.routeID;
  const [difficulty, setDifficulty] = React.useState(
    userRoute.difficultyRating,
  );
  const [date, setDate] = React.useState(userRoute.date);
  const [description, setDescription] = React.useState(userRoute.description);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function EditLog(log) {
    const response = await axios.put(
      `${API_BASE_URL}userroutes/${id}?routeID=${routeID}`,
      log,
    );
    console.log("Response", response);
    // console.log("Response", response);
    if (response.status === 201 || response.state === 200) {
      // console.log("Log created successfully", response.data);
      //This post method returns the whole thing created at action, which is the primary keys, referencs (Route and Application User),
      //description, etc. Do I want to add these or just the routes? We will need to access the logs too btw.
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const newLog = {
      id,
      routeID,
      description,
      date: new Date(date).toISOString(),
      DifficultyRating: difficulty,
    };

    EditLog(newLog);
  }

  return (
    <React.Fragment>
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
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to edit this route? {userRoute.route.name} on
            {userRoute.date}
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
                value={date}
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
            color="success"
            type="submit"
          >
            Save
          </MyButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
