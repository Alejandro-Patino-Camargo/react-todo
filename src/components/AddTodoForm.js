import React, { useState } from "react";
import propTypes from "prop-types";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function AddTodoForm({ addTodo, addTodoAirtable, tagOptions }) {
  const [newTodo, setNewTodo] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [selectedTag, setSelectedTag] = useState("Misc");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const newTodoData = await addTodoAirtable({
      title: newTodo,
      notes: newNote || "",
      dueDate: newDueDate || null,
      tag: selectedTag || "Misc",
    });

    if (newTodoData) {
      addTodo(newTodoData);
      setNewTodo("");
      setNewNote("");
      setNewDueDate("");
      setSelectedTag("Misc");
    }
  };

  AddTodoForm.propTypes = {
    addTodo: propTypes.func,
    addTodoAirtable: propTypes.func,
    tagOptions: propTypes.array,
  };

  return (
    <div
      className="todoForm"
      style={{ display: "flex", alignItems: "center", paddingLeft: "1rem" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <TextField
          type="text"
          label="Add a new task"
          variant="outlined"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          size="small"
          style={{ marginRight: "15px" }}
          autoComplete="off"
          name={`field-${Math.random().toString(36).substring(7)}`}
        />
        <TextField
          type="text"
          label="Add a note"
          variant="outlined"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          size="small"
          style={{ marginRight: "15px" }}
          autoComplete="off"
        />

        <FormControl
          variant="outlined"
          size="small"
          style={{ marginRight: "15px", minWidth: "100px" }}
        >
          <InputLabel htmlFor="tag">Tag</InputLabel>
          <Select
            label="Tag"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            {tagOptions.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="date"
          label=""
          variant="outlined"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          size="small"
          style={{ marginRight: "15px" }}
        />
        <IconButton type="submit" size="small">
          <AddCircleOutlineIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default AddTodoForm;
