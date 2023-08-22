import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList(props) {
  const { list } = props;
  return (
    <ul>
      {list.map(function (item) {
        return <TodoListItem key={item.objectID} item={item} />;
      })}
    </ul>
  );
}

export default TodoList;
