import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const skills = [
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  " BackEnd",
  "FrontEnd",
  "Quantum physics",
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return <MainBox />;
}
function MainBox() {
  return (
    <div className="mainBox">
      <div className="pictureBox">
        <img className="picture1" src="/picture1.jpg" alt="pic1"></img>
      </div>
      <h1 className="title">Radoslaw Balicki</h1>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <SkillSet />
    </div>
  );
}
function SkillSet() {
  return (
    <div className="skillset">
      {skills.map((n) => (
        <Skill name={n} />
      ))}
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill">
      <p>{props.name}</p>
    </div>
  );
}
