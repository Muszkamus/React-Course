import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const skills = [
  { name: "JavaScript", level: "advanced", color: "bisque" },
  { name: "HTML", level: "intermediate", color: "beige" },
  { name: "CSS", level: "advanced", color: "yellow" },
  { name: "React", level: "intermediate", color: "red" },
  { name: "BackEnd", level: "beginner", color: "white" },
  { name: "FrontEnd", level: "intermediate", color: "brown" },
  { name: "Quantum physics", level: "beginner", color: "green" },
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
      {skills.map((data) => (
        <Skill
          name={data.name}
          level={data.level}
          color={data.color}
          key={data.name}
        />
      ))}
    </div>
  );
}

function Skill({ name, level, color }) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <p>{name}</p>
      <p>
        {level === "beginner" && "😐"}
        {level === "intermediate" && "😌"}
        {level === "advanced" && "😁"}
      </p>
    </div>
  );
}
