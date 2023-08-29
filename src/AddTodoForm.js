import React from "react";
import { InputWithLabel } from "./inputWithLable";

function AddTodoForm(props) {
  const { addTodo } = props;
  const [todoTitle, setTodoTitle] = React.useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const todoTitle = event.target.elements.title.value;

    addTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle("");
  }

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <InputWithLabel
          id="todoTitle"
          value={todoTitle}
          onChange={handleTitleChange}
        >
          Title{" "}
        </InputWithLabel>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
