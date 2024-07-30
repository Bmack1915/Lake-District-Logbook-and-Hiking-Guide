import { useSelector } from "react-redux";
import RouteViewCard from "./RouteViewCard";
import { List, ListItem, Box } from "@mui/material";

function SuggestedRoutes() {
  const filteredRoutes = useSelector((state) => state.route.filteredRoutes);
  if (filteredRoutes.length > 10) return null;

  return (
    <Box sx={{ maxHeight: "70vh", overflow: "auto", padding: 2 }}>
      <List>
        {filteredRoutes.map((fr) => (
          <ListItem
            key={fr.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <RouteViewCard route={fr} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SuggestedRoutes;
