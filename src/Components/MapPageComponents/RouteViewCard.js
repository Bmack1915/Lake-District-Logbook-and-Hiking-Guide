import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea } from "@mui/material";
import { useSelector } from "react-redux";
import theme from "../../theme";
import SendIcon from "@mui/icons-material/Send";

export default function RouteViewCard({ route }) {
  if (route)
    return (
      <Card sx={{ maxWidth: 700, maxHeight: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image="lakes.png"
            alt="lake"
            sx={{ objectFit: "cover", maxHeight: 150 }}
          />
          <CardContent sx={{ backgroundColor: theme.palette.four.main }}>
            <Typography gutterBottom variant="h5" component="div" color="one">
              {route.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {route.description}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1">
                {route.distanceKm} km ({route.distanceM} miles),{" "}
                {route.difficulty}
              </Typography>
              <Button
                variant="contained"
                color="one"
                sx={{ textTransform: "none" }}
                endIcon={<SendIcon />}
              >
                More info
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}
