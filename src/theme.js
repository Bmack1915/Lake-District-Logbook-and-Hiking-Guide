// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    one: { main: "#709176" },
    two: { main: "#BC6C25" },
    three: { main: "#DDA15E" },
    four: { main: "#FEFAE0" },
    five: { main: "#023436" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
