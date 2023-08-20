import React from "react";
import TodoListItem from "./TodoListItem";

export const list = [
  {
    title: "vim cheat sheet",
    author: "some nerd",
    num_comments: "5",
    points: "3",
    objectID: "0",
    url: "google.com",
  },
  {
    title: "git cook book",
    author: "git gods",
    num_comments: "2",
    points: "5",
    objectID: "1",
    url: "git.com",
  },
];

function TodoList(props) {
  return (
    <ul>
      {props.list.map(function (item) {
        return <TodoListItem key={item.objectID} item={item} />;
      })}
    </ul>
  );
}

export default TodoList;
