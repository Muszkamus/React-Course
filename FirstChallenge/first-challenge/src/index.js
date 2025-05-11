import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <MainBox />
  </React.StrictMode>
);

function App() {
  return <div className="main"></div>;
}
function MainBox() {
  return (
    <div className="mainBox">
      <div className="picture">Picture</div>
      <h1 className="title">Radoslaw Balicki</h1>
      <h2 className="description">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </h2>
      <SkillSet />
    </div>
  );
}
function SkillSet() {
  <Skills name="JavaScript" />;
  return <div className="skillset"></div>;
}

function Skills(props) {}
