import React from "react";

const list = [
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

function TodoList() {
  return (
    <ul>
      {list.map(function (item) {
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> by {item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
