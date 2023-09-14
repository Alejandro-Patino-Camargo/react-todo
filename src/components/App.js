import React, { useState, useEffect } from "react";
import TodoList from "./TodoList.js";
import AddTodoForm from "./AddTodoForm.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_NAME = process.env.TABLE_NAME;

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
      };

      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;
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

  const addTodoAirtable = async (newTodoTitle) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify({
          fields: {
            title: newTodoTitle,
          },
        }),
      };

      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log("New todo added to table:", data.fields.title);

      return { id: data.id, title: data.fields.title };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Todo List</h1>
              <AddTodoForm
                addTodo={addTodo}
                addTodoAirtable={addTodoAirtable}
              />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList list={todoList} onRemoveTodo={removeTodo} />
              )}
              <hr />
            </div>
          }
        />
        <Route
          path="/new"
          element={
            <div>
              <h1>New Todo List</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
