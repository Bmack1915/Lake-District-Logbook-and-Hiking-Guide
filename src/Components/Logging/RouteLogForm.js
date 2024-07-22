import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function RouteLogForm({ route }) {
  //Date.now()? This is used in the react udemy course
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const difficulties = [
    "Easy",
    "Easy/Moderate",
    "Moderate",
    "Moderate/Hard",
    "Hard",
    "Very Hard",
    "Severe",
  ];

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const newLog = {
      description,
      date,
      route: route.routeID,
      difficulty,
    };

    alert("Log added to logbook!");
    setDate(today);
    setDescription("");
    setDifficulty("");
  }

  return (
    <div className="s-justify-between flex flex-col items-center">
      <h1 className="mb-5 w-full text-center text-3xl font-bold text-gray-800">
        Route: {route.name}
      </h1>
      <form onSubmit={handleSubmit}>
        <ul className="space-y-8">
          <li>
            <TextField
              id="outlined-basic"
              type="text"
              value={description}
              placeholder="How did it go?"
              onChange={(e) => setDescription(e.target.value)}
            />
          </li>
          <li>
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

          <li>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </li>
          <li>
            <Button variant="contained" type="submit">
              Submit Log
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
}
