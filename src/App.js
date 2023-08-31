import React, { useState, useEffect } from "react";
import TodoList from "./TodoList.js";
import AddTodoForm from "./AddTodoForm.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState(
    localStorage.getItem("savedTodoList")
      ? JSON.parse(localStorage.getItem("savedTodoList"))
      : []
  );

  useEffect(() => {
    const fetchDataAsync = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([]);
      }, 2000);
    });

    fetchDataAsync.then((newData) => {
      setTodoList([...todoList, ...newData]);
      setIsLoading(false);
    });
  }, []);
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  const removeTodo = (itemToRemove) => {
    const updatedList = todoList.filter(
      (todoItem) => itemToRemove.id !== todoItem.id
    );
    setTodoList(updatedList);
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList list={todoList} onRemoveTodo={removeTodo} />
      )}
      <hr />
    </div>
  );
}

export default App;
