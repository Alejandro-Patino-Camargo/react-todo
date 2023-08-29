import React from "react";

function TodoListItem({ item, onRemoveTodo }) {
  const handleRemoveItem = () => {
    onRemoveTodo(item);
  };

  return (
    <>
      <li>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span> {item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <button type="button" onClick={handleRemoveItem}>
          Remove
        </button>
      </li>
    </>
  );
}

export default TodoListItem;
