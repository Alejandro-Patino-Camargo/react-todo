import React from "react";
import TodoListItem from "./TodoListItem";
import propTypes from "prop-types";

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
  list: propTypes.array,
  onRemoveTodo: propTypes.func,
};

export default TodoList;
