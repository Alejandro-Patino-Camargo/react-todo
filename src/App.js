import * as React from "react";
import TodoList from "./TodoList.js";
import AddTodoForm from "./AddTodoForm.js";
import { list } from "./TodoList.js";

function App() {
  const [newTodo, setNewTodo] = React.useState("");

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <AddTodoForm onAddToDo={setNewTodo} />
      <li>{newTodo}</li>
      <TodoList list={list} />
      <hr />
    </div>
  );
}

export default App;
