import React, { useState, useEffect } from "react";
import TodoList from "./TodoList.js";
import AddTodoForm from "./AddTodoForm.js";

function TodoContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  const AIRTABLE_API_TOKEN =
    "patYREWD3ckcY90Py.dd45bc0561b5a06228c2f304411ccfb996a2b0e6207a7c93fc3e8ad83f366ea8";
  const AIRTABLE_BASE_ID = "appRWgiocxtkiK6vc";
  const TABLE_NAME = "Default";

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

      // Sorting data by createdTime in ascending or descending order
      const sorted = data.records
        .map((record) => ({
          id: record.id,
          title: record.fields.title,
          createdTime: new Date(record.createdTime),
        }))
        .sort((a, b) => {
          return sortOption === "newest"
            ? a.createdTime.getTime() - b.createdTime.getTime()
            : b.createdTime.getTime() - a.createdTime.getTime();
        });

      setTodoList(sorted);
      setIsLoading(false);

      return data;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOption]);

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
        throw Error(message);
      }

      const data = await response.json();
      console.log("New todo added to table:", data.fields.title);

      return { id: data.id, title: data.fields.title };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = async (itemToRemove) => {
    try {
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}/${itemToRemove.id}`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorMessage = `Error: HTTP ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }

      console.log(
        `Todo with ID ${itemToRemove.id} has been deleted successfully`
      );

      const updatedTodoList = todoList.filter(
        (todoItem) => itemToRemove.id !== todoItem.id
      );

      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      return false;
    }
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodo} addTodoAirtable={addTodoAirtable} />

      <label htmlFor="sortOption">Sort list: </label>
      <select
        id="sortOption"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="newest">oldest</option>
        <option value="oldest">newest</option>
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList list={todoList} onRemoveTodo={removeTodo} />
      )}

      <hr />
    </div>
  );
}

export default TodoContainer;
