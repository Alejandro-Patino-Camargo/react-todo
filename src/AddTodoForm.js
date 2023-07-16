import React from "react";

function AddTodoForm() {
  return (
    <div>
      <form>
        <label id="todoTitle">Title</label>
        <input id="todoTitle" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
