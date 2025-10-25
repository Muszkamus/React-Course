import { useState } from "react";

/* ============================================================
   Higher-Order Component (HOC): withToggles
   ============================================================
   ✅ Purpose:
   Wrap any list-like component (e.g., ProductList, CompanyList)
   and inject reusable toggle behaviors:
   - Show/hide the entire list
   - Collapse to first 3 items

   💡 A HOC is a function that takes a component as input and 
   returns a new component with extended functionality.
   This allows logic reuse *without* duplicating code across components.
   ============================================================ */
export default function withToggles(WrappedComponent) {
  // Return a new component that wraps the original
  return function List(props) {
    // Local state for toggling visibility
    const [isOpen, setIsOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Limit items shown if collapsed
    const displayItems = isCollapsed ? props.items.slice(0, 3) : props.items;

    // Toggle open/close list visibility
    function toggleOpen() {
      setIsOpen((isOpen) => !isOpen);
      setIsCollapsed(false);
    }

    return (
      <div className="list-container">
        {/* Heading with title and expand/collapse arrow */}
        <div className="heading">
          <h2>{props.title}</h2>
          <button onClick={toggleOpen}>
            {isOpen ? <span>&or;</span> : <span>&and;</span>}
          </button>
        </div>

        {/* 
          Render the wrapped component (passed from outside)
          and forward all props + filtered items.
          This allows the wrapped component to focus *only on rendering logic*
          while this HOC handles toggling behavior.
        */}
        {isOpen && <WrappedComponent {...props} items={displayItems} />}

        {/* Collapse / show all button */}
        <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
          {isCollapsed ? `Show all ${props.items.length}` : "Show less"}
        </button>
      </div>
    );
  };
}
