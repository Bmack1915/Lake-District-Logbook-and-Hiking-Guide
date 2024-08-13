import React from "react";
import useDeleteWainwright from "../../Utilities/useDeleteWainwright";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

function CompletedWainwrights({ userWainwrights }) {
  const wainwrightsLeft = 214 - userWainwrights.length;
  const deleteWainwright = useDeleteWainwright();

  if (!userWainwrights) {
    return (
      <div className="my-4 flex flex-col items-center">
        <p className="text-lg">
          You haven't logged any Wainwrights as complete!
        </p>
      </div>
    );
  }

  return (
    <Table aria-label="Example static collection table">
      <TableHeader className="font-bold">
        <TableColumn>Wainwright</TableColumn>
        <TableColumn>Date Completed</TableColumn>
        <TableColumn>Height</TableColumn>
      </TableHeader>
      <TableBody>
        {userWainwrights.map((uw) => (
          <TableRow key={uw.wainwrightID}>
            <TableCell>{uw.name}</TableCell>
            <TableCell>{uw.name}</TableCell>
            <TableCell>{uw.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CompletedWainwrights;
