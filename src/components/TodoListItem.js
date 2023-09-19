import React from "react";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoListItem({ item, onRemoveTodo }) {
  const handleRemoveItem = () => {
    onRemoveTodo(item);
  };

  return (
    <ListItem>
      <ListItemText
        primary={
          <a style={{ fontFamily: "verdana", color: "#333" }}>{item.title}</a>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleRemoveItem}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
