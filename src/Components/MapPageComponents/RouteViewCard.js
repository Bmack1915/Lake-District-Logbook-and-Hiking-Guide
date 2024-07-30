import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Grid, Container } from "@mui/material";
import { useSelector } from "react-redux";
import theme from "../../theme";
import SendIcon from "@mui/icons-material/Send";

export default function RouteViewCard({ route }) {
  // const filteredRoutes = useSelector((state) => state.route.routes);
  // const route = filteredRoutes[0];
  return (
    <Container maxWidth="xl" sx={{ mt: 1, mb: 1 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="100"
                image="lakes.png"
                alt="lake"
                sx={{ objectFit: "cover", maxHeight: { xs: 200, md: 300 } }}
              />
              <CardContent sx={{ backgroundColor: theme.palette.four.main }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="one"
                >
                  {route.name}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign="justify"
                  color="text.secondary"
                >
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
        </Grid>
      </Grid>
    </Container>
  );
}
