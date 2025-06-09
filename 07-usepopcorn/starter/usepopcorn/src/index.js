import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
// import "./index.css";
// import App from "./App";

import StarRating from "./StarRating";
function Test() {
  const [movieRating, setmMovieRating] = useState(0);
  return (
    <div>
      <StarRating
        color="blue"
        maxRating={10}
        // We pass setMovieRating as the onSetRating prop.
        // This allows the StarRating component to update state in the parent (Test) when a star is clicked.
        // Inside StarRating, calling onSetRating(rating) triggers setMovieRating(rating) here.
        // State name is const [rating, setRating] = useState(defaultRating);

        onSetRating={setmMovieRating}
      />
      <p> This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />

    <StarRating
      maxRating={5}
      color={"green"}
      size={20}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />

    <Test />
  </React.StrictMode>
);
