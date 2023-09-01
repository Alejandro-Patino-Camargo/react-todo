import React, { useState, useEffect } from "react";
import TodoList from "./TodoList.js";
import AddTodoForm from "./AddTodoForm.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${REACT_APP_AIRTABLE_API_TOKEN}`,
        },
      };

      const url = `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE_ID}/${REACT_APP_TABLE_NAME}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
      }));

      setTodoList(todos);
      setIsLoading(false);

      return data;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
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
