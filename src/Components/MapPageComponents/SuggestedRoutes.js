import React from "react";
import { useSelector } from "react-redux";
import RouteViewCard from "./RouteViewCard";
import { List, ListItem, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SuggestedRoutes() {
  const routes = useSelector((state) => state.route.routes);

  return (
    <Box sx={{ maxHeight: "70vh", overflow: "auto", padding: "16px" }}>
      <Grid spacing={2}>
        {routes.map((route) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={route.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <RouteViewCard route={route} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
