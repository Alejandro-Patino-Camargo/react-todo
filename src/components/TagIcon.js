import propTypes from "prop-types";

const tagColors = {
  University: {
    background: "#B0E0E6",
    text: "#0077B6",
  },
  Work: {
    background: "#E6F5E5",
    text: "#008000",
  },
  Home: {
    background: "#FFF8E2",
    text: "#FF8C00",
  },
  Misc: {
    background: "#f2d5ae",
    text: "#8B4513",
  },
};

export default function renderTagIcon(tagName) {
  const tagColor = tagColors[tagName];
  return (
    <span
      style={{
        backgroundColor: tagColor.background,
        color: tagColor.text,
        padding: "2px 6px",
        borderRadius: "4px",
        display: "inline-block",
      }}
    >
      {tagName}
    </span>
  );
}

renderTagIcon.propTypes = {
  tagName: propTypes.string,
};
