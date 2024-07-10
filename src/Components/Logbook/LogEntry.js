import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../Utilities/apiConfig";
import axios from "axios";
import { gpx } from "@tmcw/togeojson";
import { bind } from "leaflet";
import LeafletGPXMap from "../LeafletMapDev/LeafletGPXMap";
import decodeBase64 from "../Utilities/Decode64";

export default function LogEntry() {
  const [gpxFile, setGpxFile] = useState();
  const [gpxFileUrl, setGpxFileUrl] = useState();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [associatedWainwrights, setAssociatedWainwrights] = useState([]);

  //Receieve r object from the navigated from page (Route marker containing this route info).
  const passedState = useLocation();
  const route = passedState.state.r;

  useEffect(() => {
    async function getAssociatedWainwrights() {
      const res = await axios.get(
        `${API_BASE_URL}WainwrightRoutes/wainwrights/fromRoute/${route.routeID}`,
      );

      const wainwrightObjs = await res.data.$values;
      setAssociatedWainwrights(wainwrightObjs);
    }

    getAssociatedWainwrights();
  }, [route.routeID]);

  useEffect(() => {
    async function getGpxFile() {
      const res = await axios.get(
        `${API_BASE_URL}Routes/gpxfile/${route.routeID}`,
      );
      setGpxFile(res.data.gpxFile);
    }
    getGpxFile();
  }, [route.routeID]);

  useEffect(() => {
    if (gpxFile) {
      const url = decodeBase64(gpxFile);
      setGpxFileUrl(url);
    }
  }, [gpxFile]);

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const newLog = {
      description: description,
      date: date,
      route: route.routeID,
    };
    console.log(newLog); // You can replace this with any action you want to perform with newLog

    alert("Log added to logbook!");
    setDate(today);
    setDescription("");
  }

  return (
    <div className="flex border-spacing-8 justify-center border-black font-serif">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-5">Route : {route.name}</h1>

        <h2>
          This route achieves the following {associatedWainwrights.length}{" "}
          Wainwrights!
        </h2>
        {associatedWainwrights.map((w) => (
          <h3 className="m-4">
            ⛰️ {w.name}, {w.heightM}m
          </h3>
        ))}

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
      <div className="w-1/2 p-4">
        <LeafletGPXMap url={gpxFileUrl} />
      </div>
    </div>
  );
}
