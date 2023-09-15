import React from "react";
import TodoContainer from "./components/TodoContainer";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <TodoContainer tableName="Your Todos" />
    </div>
  );
}

export default App;
