import React from "react";
import PropTypes from "prop-types";
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
    id: PropTypes.exact(PropTypes.number.isRequired),
    todoTitle: PropTypes.func,
    handleTitleChange: PropTypes.func,
    children: PropTypes.exact(PropTypes.string.isRequired),
    isFocused: PropTypes.func,
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
