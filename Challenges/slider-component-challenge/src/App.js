import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  collapsedNumWords = 20,
  expandButtonText = "Show text",
  collapseButtonText = "Collapse text",
  buttonColor = "blue",
  className = "box",
  children,
}) {
  const [expanded, setExpanded] = useState(false);
  const childrenString = String(children);
  const childrenWords = childrenString.trim().split(" ");

  const buttonStyle = {
    color: buttonColor,
    backgroundColor: "transparent",
    border: "0px",
    cursor: "pointer",
  };
  function handleExpanding() {
    setExpanded((expanded) => !expanded);
  }

  // function showSplitText(string, length) {
  //   if (typeof string === !"string") return;

  //   if (string.length > length) {
  //     // Use slice to show first 20 letters conditionally
  //     return string.slice(0, collapsedNumWords); // Simple, if it is higher than collapsedNumWord, then change the state of the button and expanded, and show first 20 characters with ... at the end
  //   } else return string; // Show whole children prop
  // }
  return (
    <div className={className}>
      <p>
        {expanded
          ? childrenString
          : childrenWords.slice(0, collapsedNumWords).join(" ") + "..."}{" "}
        <button style={buttonStyle} onClick={handleExpanding}>
          {expanded ? collapseButtonText : expandButtonText}
        </button>
      </p>
    </div>
  );
}
