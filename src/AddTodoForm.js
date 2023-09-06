import React, { useState } from "react";

function AddTodoForm({ addTodo, addTodoAirtable }) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const newTodoData = await addTodoAirtable(newTodo);
    if (newTodoData) {
      addTodo(newTodoData);
      setNewTodo("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
