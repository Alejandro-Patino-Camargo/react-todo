import React from "react";
import PropTypes from "prop-types";

function TodoListItem({ item, onRemoveTodo }) {
  const handleRemoveItem = () => {
    onRemoveTodo(item);
  };

  return (
    <div className="todoListItem">
      <span className="todoTitle">{item.title}</span>
      <button className="deleteButton" onClick={handleRemoveItem}>
        Delete
      </button>
    </div>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.string.isRequired),
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
