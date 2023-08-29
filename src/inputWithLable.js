import React from "react";

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
