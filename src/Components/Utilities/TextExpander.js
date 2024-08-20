import { useState } from "react";

export default function TextExpander({
  children,
  className = "box",
  expandedDefault = false,
  buttonColor = "blue",
  textColor = "black",
  expandButtonText = "Show more...",
  collapseButtonText = "Show less...",
  collapsedNumWords = 10,
  setOpen,
}) {
  const [expanded, setExpanded] = useState(expandedDefault);
  const words = children.split(" ");
  const collapsedText = words.slice(0, collapsedNumWords).join(" ") + "...";

  function handleClick() {
    setOpen((e) => !e);
  }

  const buttonStyle = {
    color: buttonColor,
    background: "none",
    font: "inherit",
    border: "none",
    cursor: "pointer",
    margin: "6px",
  };

  const textStyle = {
    color: textColor,
  };

  return (
    <div className={className}>
      <p style={textStyle}>{expanded ? children : collapsedText}</p>
      <button onClick={handleClick} style={buttonStyle}>
        {expanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
