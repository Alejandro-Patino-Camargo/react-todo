import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm.js";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PersistentDrawerLeft from "./Sidebar.js";
import Checkbox from "@mui/material/Checkbox";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import renderTagIcon from "./TagIcon.js";

function TodoContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [sortOption, setSortOption] = useState("oldest");
  const [tagOptions] = useState(["University", "Work", "Home", "Misc"]);

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
      };

      const AIRTABLE_BASE_ID = "appRWgiocxtkiK6vc";
      const TABLE_NAME = "Default";

      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);

      const sorted = data.records
        .map((record) => ({
          id: record.id,
          title: record.fields.title,
          notes: record.fields.notes,
          tag: record.fields.tag,
          dueDate: record.fields.dueDate,
          createdTime: new Date(record.createdTime),
        }))
        .sort((a, b) => {
          const dateA = a.dueDate ? new Date(a.dueDate) : null;
          const dateB = b.dueDate ? new Date(b.dueDate) : null;

          if (sortOption === "newest") {
            return dateB - dateA || a.createdTime - b.createdTime;
          } else {
            return dateA - dateB || a.createdTime - b.createdTime;
          }
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
    fetchData(sortOption);
  });

  const addTodo = async (newTodoData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
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

      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw Error(message);
      }

      const data = await response.json();
      console.log("New todo added to table:", data.fields.title);

      setTodoList([data, ...todoList]);

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

  return (
    <div className="TodoContainer" style={{ width: "1000px" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setSortOption("oldest")}
            style={{
              fontSize: "16px",
              padding: "5px",
              borderRadius: "4px",
            }}
            color={sortOption === "oldest" ? "primary" : "default"}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            onClick={() => setSortOption("newest")}
            style={{
              fontSize: "16px",
              padding: "5px",
              borderRadius: "4px",
            }}
            color={sortOption === "newest" ? "primary" : "default"}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
        {isLoading ? (
          <p style={{ fontSize: "18px", margin: "20px" }}>Loading...</p>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Task
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Note
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Tag
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Due Date
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Done
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todoList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell style={{ fontSize: "16px" }}>
                        {item.title}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }}>
                        {item.notes}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }}>
                        {renderTagIcon(item.tag)}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }}>
                        {formatDate(item.dueDate)}
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={false}
                          onChange={() => removeTodo(item)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <hr
              style={{
                margin: "20px 0",
                border: "none",
                borderBottom: "1px solid #ccc",
              }}
            />
          </>
        )}
        <AddTodoForm addTodo={addTodo} tagOptions={tagOptions} />
      </Box>
      <PersistentDrawerLeft />
    </div>
  );
}

export default TodoContainer;
