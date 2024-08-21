import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import StarRating from "../../Utilities/StarRating";

import ViewRouteButton from "./ViewRouteButton";
import formatDate from "../../Utilities/utilityFuncsStats";
import timeConverter from "../../Utilities/timeConverter";
import durationConverter from "../../Utilities/durationConverter";
import TextExpander from "../../Utilities/TextExpander";
import { useSelector } from "react-redux";

export default function CompletedRoutesTable() {
  const userRoutes = useSelector((state) => state.user.userRoutes);

  const columns = [
    { title: "Name" },
    { title: "Distance" },
    { title: "Ascent" },
    { title: "Estimated Time" },
    { title: "Description" },
    { title: "Date" },
    { title: "Rating" },
    { title: "Your time" },
    { title: "Log" },
  ];

  return (
    <div>
      <Table aria-label="Completed Routes Table">
        <TableHeader>
          {columns.map((col, index) => (
            <TableColumn className="text-2xl font-bold" key={index}>
              {col.title}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {userRoutes.map((uw, index) => (
            <TableRow key={index}>
              <TableCell className="text-xl font-bold">
                {uw.route.name}
              </TableCell>
              <TableCell className="text-center text-lg">
                {uw.route.distanceKm} Km ({uw.route.distanceM}m)
              </TableCell>
              <TableCell className="text-center text-lg">
                {uw.route.ascentM}m ({uw.route.ascentF} ft)
              </TableCell>
              <TableCell className="text-center text-lg">
                {timeConverter(uw.route.time)}
              </TableCell>
              <TableCell className="text-center text-lg">
                {uw.description ? (
                  <div className="w-40">
                    <TextExpander expandedDefault={false}>
                      {uw.description}
                    </TextExpander>
                  </div>
                ) : (
                  "N/A"
                )}
              </TableCell>

              <TableCell className="w-56 text-center text-lg">
                {uw.date ? formatDate(uw.date) : "N/A"}
              </TableCell>
              <TableCell>
                {uw.rating ? (
                  <StarRating size={36} disabled defaultRating={uw.rating} />
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell className="w-56 text-center text-lg">
                {uw.duration !== null ? durationConverter(uw.duration) : "N/A"}
              </TableCell>
              <TableCell>
                <ViewRouteButton userRoute={uw} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
