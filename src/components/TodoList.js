import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

function TodoList({ list, onRemoveTodo }) {
  return (
    <ul>
      {list.map(function (item) {
        return (
          <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo} />
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string.isRequired),
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
