import React from "react";

function TodoListItem(props) {
  const { item } = props;
  return (
    <div>
      <li>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span> by {item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </li>
    </div>
  );
}

export default TodoListItem;
