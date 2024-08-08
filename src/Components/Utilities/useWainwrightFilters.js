import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { maxWHeight, minWHeight } from "./Stats";
import { setFilteredWainwrights } from "../../redux/wainwrightSlice";

function useWainwrightFilters(userWainwrights) {
  const dispatch = useDispatch();
  const wainwrights = useSelector((state) => state.wainwright.wainwrights);
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentHeight, setCurrentHeight] = useState([minWHeight, maxWHeight]);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    function checkFilter() {
      let filtered = Array.isArray(wainwrights) ? wainwrights : [];

      if (filterStatus === "completed") {
        filtered = Array.isArray(userWainwrights) ? userWainwrights : [];

        filtered = filtered.filter(
          (w) => w.heightM >= currentHeight[0] && w.heightM <= currentHeight[1],
        );

        if (selectedArea) {
          filtered = filtered.filter((w) => w.area === selectedArea);
        }
      }

      filtered = filtered.filter(
        (w) => w.heightM >= currentHeight[0] && w.heightM <= currentHeight[1],
      );

      if (selectedArea) {
        filtered = filtered.filter((w) => w.area === selectedArea);
      }

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
  ]);

  function handleReset() {
    setSelectedArea(null);
    dispatch(setFilteredWainwrights(wainwrights));
    setCurrentHeight([minWHeight, maxWHeight]);
    setFilterStatus("all");
  }

  return {
    selectedArea,
    setSelectedArea,
    currentHeight,
    setCurrentHeight,
    filterStatus,
    setFilterStatus,
    handleReset,
  };
}

export default useWainwrightFilters;
