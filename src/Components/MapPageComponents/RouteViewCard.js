import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import { useSelector } from "react-redux";

export default function RouteViewCard() {
  const filteredRoutes = useSelector((state) => state.route.routes);
  const route = filteredRoutes[0];

  if (route)
    return (
      <Card sx={{ maxWidth: 6000, maxHeight: 600 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image="lakes.png"
            alt="green iguana"
            sx={{ objectFit: "cover", maxHeight: 120 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {route.name}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              {route.description}
            </Typography>
            <div className="flex items-center justify-between">
              <h2>
                {route.distanceKm} km ({route.distanceM} miles),{" "}
                {route.difficulty}
              </h2>
              <Button>Hello</Button>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}
