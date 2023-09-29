import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../src/components/LandingPage";
import TodoContainer from "./components/TodoContainer";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="App" style={{ fontFamily: "verdana" }}>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/todos" element={<TodoContainer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
