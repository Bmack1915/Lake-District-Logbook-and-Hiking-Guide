import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { maxWHeight, minWHeight } from "./Stats";
import { setFilteredWainwrights } from "../../redux/wainwrightSlice";

//Component that filters a Wainwrights array based on the UI filters applied.
function useWainwrightFilters(userWainwrights) {
  const dispatch = useDispatch();
  const wainwrights = useSelector((state) => state.wainwright.wainwrights);
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentHeight, setCurrentHeight] = useState([minWHeight, maxWHeight]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    function checkFilter() {
      let filtered = Array.isArray(wainwrights) ? wainwrights : [];

      //If the user has selected completed radio button, the filtered array becomes their completed Wainwrights list
      if (filterStatus === "completed") {
        filtered = filtered.filter((w) =>
          userWainwrights.map((uw) => uw.wainwright.name).includes(w.name),
        );
        filtered = filtered.filter(
          (w) => w.heightM >= currentHeight[0] && w.heightM <= currentHeight[1],
        );

        if (selectedArea) {
          filtered = filtered.filter((w) => w.area === selectedArea);
        }
      } else if (filterStatus === "uncompleted") {
        filtered = filtered.filter(
          (w) =>
            !userWainwrights.map((uw) => uw.wainwright.name).includes(w.name),
        );
        filtered = filtered.filter(
          (w) => w.heightM >= currentHeight[0] && w.heightM <= currentHeight[1],
        );

        if (selectedArea) {
          filtered = filtered.filter((w) => w.area === selectedArea);
        }
      }

      //Search bar implementation
      if (query.length > 0) {
        filtered = filtered.filter((w) =>
          w.name.toLowerCase().includes(query.toLocaleLowerCase()),
        );
      }

      filtered = filtered.filter(
        (w) => w.heightM >= currentHeight[0] && w.heightM <= currentHeight[1],
      );

      if (selectedArea) {
        filtered = filtered.filter((w) => w.area === selectedArea);
      }

      //Update the filtered Wainwrights data globally
      dispatch(setFilteredWainwrights(filtered));
    }

    checkFilter();
  }, [
    selectedArea,
    currentHeight,
    wainwrights,
    dispatch,
    filterStatus,
    userWainwrights,
    query,
  ]);

  function handleReset() {
    setSelectedArea(null);
    dispatch(setFilteredWainwrights(wainwrights));
    setCurrentHeight([minWHeight, maxWHeight]);
    setFilterStatus("all");
    setQuery("");
  }

  return {
    selectedArea,
    setSelectedArea,
    currentHeight,
    setCurrentHeight,
    filterStatus,
    setFilterStatus,
    handleReset,
    query,
    setQuery,
  };
}

export default useWainwrightFilters;
