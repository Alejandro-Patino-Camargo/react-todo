import React from "react";
import TodoContainer from "./components/TodoContainer";
import "./app.css";

function App() {
  return (
    <div className="App">
      <TodoContainer tableName="Your Todos" />
    </div>
  );
}

export default App;
