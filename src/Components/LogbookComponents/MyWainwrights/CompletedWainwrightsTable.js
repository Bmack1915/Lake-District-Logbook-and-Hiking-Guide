import React, { useState } from "react";
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

function CompletedWainwrightsTable({
  userWainwrights,
  fetchUserWainwrightData,
}) {
  const [selectedWainwrightID, setSelectedWainwrightID] = useState(null);

  const handleOpenLog = (wainwrightID) => {
    setSelectedWainwrightID(wainwrightID);
  };

  const handleCloseLog = () => {
    setSelectedWainwrightID(null);
  };

  return (
    <Table
      isHeaderSticky
      className="h-144 w-[85vh] overflow-scroll"
      aria-label="Completed Wainwrights Table"
      selectionMode="single"
    >
      <TableHeader className="text-2xl font-bold">
        <TableColumn className="text-start text-2xl">
          My Wainwrights
        </TableColumn>
        <TableColumn className="text-center text-2xl">
          Date Completed
        </TableColumn>
        <TableColumn className="text-center text-2xl">Log</TableColumn>
      </TableHeader>
      <TableBody>
        {userWainwrights.map((uw) => (
          <TableRow key={uw.wainwrightID}>
            <TableCell className="text-lg">{uw.wainwright.name}</TableCell>
            <TableCell className="text-center text-lg">
              {uw.date ? formatDate(uw.date) : "N/A"}
            </TableCell>
            <TableCell className="text-center">
              <Button onPress={() => handleOpenLog(uw.wainwrightID)}>
                View Log
              </Button>
              {selectedWainwrightID === uw.wainwrightID && (
                <ViewWainrightLog
                  open={true}
                  setOpen={handleCloseLog}
                  fetchUserWainwrightData={fetchUserWainwrightData}
                  userWainwright={uw}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CompletedWainwrightsTable;
