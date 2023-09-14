import React from "react";
import propTypes from "prop-types";

function TodoListItem({ item, onRemoveTodo }) {
  const handleRemoveItem = () => {
    onRemoveTodo(item);
  };

  TodoListItem.propTypes = {
    item: propTypes.object,
    onRemoveTodo: propTypes.func,
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
