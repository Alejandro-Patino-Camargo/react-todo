import React from "react";
import propTypes from "prop-types";
export function InputWithLabel({
  id,
  todoTitle,
  handleTitleChange,
  children,
  isFocused,
}) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  InputWithLabel.propTypes = {
    id: propTypes.number,
    todoTitle: propTypes.func,
    handleTitleChange: propTypes.func,
    children: propTypes.string,
    isFocused: propTypes.func,
  };

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
    </>
  );
}
