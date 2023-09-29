import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddTodoForm.css";

function AddTodoForm({ addTodo, tagOptions }) {
  const [newTodo, setNewTodo] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [selectedTag, setSelectedTag] = useState("Misc");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const newTodoData = {
      title: newTodo,
      notes: newNote || "",
      dueDate: newDueDate || null,
      tag: selectedTag || "Misc",
    };

    if (newTodoData) {
      addTodo(newTodoData);
      setNewTodo("");
      setNewNote("");
      setNewDueDate("");
      setSelectedTag("Misc");
    }
  };

  AddTodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
    tagOptions: PropTypes.arrayOf(PropTypes.string.isRequired),
  };

  return (
    <div className="todoForm">
      <form onSubmit={handleSubmit} className="formContainer">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="inputField"
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Add a note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="inputField"
        />
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="selectField"
        >
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="inputField"
        />
        <button type="submit" className="submitButton">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTodoForm;
