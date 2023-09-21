import React from "react";
import TodoContainer from "./components/TodoContainer";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <div className="App" style={{ fontFamily: "mono" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <TodoContainer tableName="Your Todos" />
      </Grid>
    </div>
  );
}

export default App;
