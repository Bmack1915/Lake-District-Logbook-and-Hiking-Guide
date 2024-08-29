import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import ViewWainrightLog from "./ViewWainwrightLog";
import formatDate from "../../Utilities/utilityFuncsStats";
import { useSelector } from "react-redux";
import Search from "../../MapComponents/Filters/SearchBar";

function CompletedWainwrightsTable() {
  const [selectedWainwrightID, setSelectedWainwrightID] = useState(null);
  const userWainwrights = useSelector((state) => state.user.userWainwrights);
  const [query, setQuery] = useState("");
  const [data, setData] = useState(userWainwrights);
  console.log("userwainwrights in table", userWainwrights);

  useEffect(() => {
    if (query.length > 1) {
      const filteredWainwrights = userWainwrights.filter((uw) =>
        uw.wainwright.name.toLowerCase().includes(query.toLowerCase()),
      );
      setData(filteredWainwrights);
    } else {
      setData(userWainwrights);
    }
  }, [query, userWainwrights]);

  const handleOpenLog = (wainwrightID) => {
    setSelectedWainwrightID(wainwrightID);
  };

  const handleCloseLog = () => {
    setSelectedWainwrightID(null);
  };

  return (
    <div>
      <div className="py-5">
        <Search placeholder="Wainwrights" query={query} setQuery={setQuery} />
      </div>
      <Table
        isHeaderSticky
        className="h-128 w-[85vh] overflow-scroll shadow-xl"
        aria-label="Completed Wainwrights Table"
        selectionMode="single"
        isStriped
      >
        <TableHeader className="bg-white text-2xl font-bold">
          <TableColumn className="w-36 text-start text-2xl">
            My Wainwrights
          </TableColumn>
          <TableColumn className="text-center text-2xl">
            Date Completed
          </TableColumn>
          <TableColumn className="text-center text-2xl">Log</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((uw) => (
            <TableRow className="bg-white" key={uw.wainwrightID}>
              <TableCell className="text-lg">{uw.wainwright.name}</TableCell>
              <TableCell className="text-center text-lg">
                {uw.date ? formatDate(uw.date) : "N/A"}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  className="bg-lightblue font-medium"
                  onPress={() => handleOpenLog(uw.wainwrightID)}
                >
                  View Log
                </Button>
                {selectedWainwrightID === uw.wainwrightID && (
                  <ViewWainrightLog
                    open={true}
                    setOpen={handleCloseLog}
                    userWainwright={uw}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompletedWainwrightsTable;
