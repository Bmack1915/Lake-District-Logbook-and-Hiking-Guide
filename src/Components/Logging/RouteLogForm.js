import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../Utilities/apiConfig";
import axios from "axios";
import LeafletGPXMap from "../LeafletMapDev/LeafletGPXMap";
import decodeBase64 from "../Utilities/Decode64";

export default function RouteLogForm({ route }) {
  //Date.now()? This is used in the react udemy course
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const newLog = {
      description: description,
      date: date,
      route: route.routeID,
    };
    console.log(newLog);

    alert("Log added to logbook!");
    setDate(today);
    setDescription("");
  }

  return (
    <div className="flex border-spacing-8 justify-center border-black font-serif">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-5">Route : {route.name}</h1>
        <ul>
          <li>
            <input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </li>
          <li>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </li>
        </ul>
        <button type="submit">Submit Log</button>
      </form>
    </div>
  );
}
