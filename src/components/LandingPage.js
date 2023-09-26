import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function LandingPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Welcome to minimaList
      </Typography>
      <Typography variant="body1" paragraph style={{ fontStyle: "verdana" }}>
        This is a to-do list web app
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/todos">
        Go to Todos
      </Button>
    </Box>
  );
}

export default LandingPage;
