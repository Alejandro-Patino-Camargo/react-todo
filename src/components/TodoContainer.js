import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm.js";
import renderTagIcon from "./TagIcon.js";
import "./TodoContainer.css";

function TodoContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [sortOption, setSortOption] = useState("oldest");
  const [tagOptions] = useState(["University", "Work", "Home", "Misc"]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
        },
      };

      const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.TABLE_NAME}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`);
      }

      const data = await response.json();

      const originalData = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
        notes: record.fields.notes,
        tag: record.fields.tag,
        dueDate: record.fields.dueDate,
        createdTime: new Date(record.createdTime),
      }));

      const sortedData = originalData.sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate) : null;
        const dateB = b.dueDate ? new Date(b.dueDate) : null;

        if (sortOption === "newest") {
          return dateB - dateA || a.createdTime - b.createdTime;
        } else {
          return dateA - dateB || a.createdTime - b.createdTime;
        }
      });

      setTodoList(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const addTodo = async (newTodoData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify({
          fields: {
            title: newTodoData.title,
            notes: newTodoData.notes,
            tag: newTodoData.tag,
            dueDate: newTodoData.dueDate,
          },
        }),
      };

      const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.TABLE_NAME}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw Error(message);
      }

      const data = await response.json();

      setTodoList([data, ...todoList]);

      await fetchData();
      return {
        id: data.id,
        title: data.fields.title,
        notes: data.fields.notes,
        tag: data.fields.tag,
        dueDate: data.fields.dueDate,
      };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const removeTodo = async (itemToRemove) => {
    try {
      const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.TABLE_NAME}/${itemToRemove.id}`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
        },
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorMessage = `Error: HTTP ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const updatedTodoList = todoList.filter(
        (todoItem) => itemToRemove.id !== todoItem.id
      );

      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      return false;
    }
  };

  function formatDate(dueDate) {
    if (!dueDate) {
      return "";
    }
    const date = new Date(dueDate);
    const options = {
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString(undefined, options);
  }

  /* Pagination when todos exceed 5 */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todoList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="TodoContainer">
      <div className="sortButtons">
        <button
          onClick={() => setSortOption("oldest")}
          className={sortOption === "oldest" ? "active" : ""}
        >
          upcoming
        </button>
        <button
          onClick={() => setSortOption("newest")}
          className={sortOption === "newest" ? "active" : ""}
        >
          not for a while
        </button>
      </div>
      {isLoading ? (
        <p className="loadingText">Loading...</p>
      ) : (
        <>
          <table className="todoTable">
            <thead>
              <tr>
                <th className="tableHeader">Task</th>
                <th className="tableHeader">Note</th>
                <th className="tableHeader">Tag</th>
                <th className="tableHeader">Due Date</th>
                <th className="tableHeader">Done</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.notes}</td>
                  <td>{renderTagIcon(item.tag)}</td>
                  <td>{formatDate(item.dueDate)}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => removeTodo(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {[...Array(Math.ceil(todoList.length / itemsPerPage)).keys()].map(
              (number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`paginationButton ${
                    currentPage === number + 1 ? "active" : ""
                  }`}
                >
                  {number + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
      <AddTodoForm addTodo={addTodo} tagOptions={tagOptions} />
    </div>
  );
}

export default TodoContainer;
