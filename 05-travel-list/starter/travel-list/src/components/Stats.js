import React from "react";

export default function Stats({ items }) {
  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((numPackedItems / numItems) * 100);
  const renderItems = function () {
    if (numItems === 0) {
      return <em>You have no items on your list</em>;
    } else if (numItems === 1 && numPackedItems === 0) {
      return (
        <em>
          You have {numItems} item on your list, and you already packed{" "}
          {numPackedItems} ({percentagePacked}%)
        </em>
      );
    } else if (numItems === numPackedItems) {
      return <em>All packed and ready to go! ✈️</em>;
    } else {
      return (
        <em>
          You have {numItems} items on your list, and you already packed{" "}
          {numPackedItems} ({percentagePacked}%)
        </em>
      );
    }
  };

  return <footer className="stats">{renderItems()}</footer>;
}
