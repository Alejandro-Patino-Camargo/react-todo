import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import TodoContainer from "./components/TodoContainer";
import Box from "@mui/material/Box";

function App() {
  return (
    <BrowserRouter>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "verdana",
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/todos"
            element={<TodoContainer tableName="Your Todos" />}
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
