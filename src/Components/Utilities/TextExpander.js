import { useState } from "react";

export default function TextExpander({
  children,
  className = "box",
  expandedDefault = false,
  buttonColor = "blue",
  textColor = "black",
  expandButtonText = "Show more...",
  collapseButtonText = "Show less...",
  collapsedNumWords = 5,
}) {
  const [expanded, setExpanded] = useState(expandedDefault);
  const words = children.split(" ");
  const collapsedText = words.slice(0, collapsedNumWords).join(" ") + "...";

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
      <button onClick={() => setExpanded(!expanded)} style={buttonStyle}>
        {expanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
