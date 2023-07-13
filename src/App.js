import React from "react";

const list = [
  {
    id: "0",
    title: "study vim shortcuts",
    prority: "1",
  },
];

function App() {
  const todoList = list.map(function (item) {
    return (
      <li key={item.id}>
        <span>ID:{item.id} </span>
        <span>{item.title}</span>
        <span> - priority {item.prority}</span>
      </li>
    );
  });

  return (
    <div>
      <h1>Todo List</h1>
      <ul>{todoList}</ul>
    </div>
  );
}

export default App;
