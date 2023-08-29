import React from "react";
import TodoList from "./TodoList.js";
import AddTodoForm from "./AddTodoForm.js";

function useSemiPersistentState(key, initialState) {
  const [state, setState] = React.useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", []);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  const removeTodo = (itemToRemove) => {
    const updatedList = todoList.filter(
      (todoItem) => itemToRemove.id !== todoItem.id
    );
    setTodoList(updatedList);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodo} />
      <TodoList list={todoList} onRemoveTodo={removeTodo} />
      <hr />
    </div>
  );
}

export default App;
