import React from "react";
import TodoListItem from "./TodoListItem";

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

export default TodoList;
