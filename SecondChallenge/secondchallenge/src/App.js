import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);

  const date = new Date(2025, 4, 18);
  const numericalDate = date.getTime();
  const day = 1000 * 60 * 60 * 24 * count;

  const countDay = new Date(numericalDate + day);

  function handleNextStep() {
    setStep((s) => s + 1);
  }

  function handlePreviousStep() {
    setStep((s) => s - 1);
  }

  function handleNextCount() {
    setCount((s) => s + 1);
  }

  function handlePreviousCount() {
    setCount((s) => s - 1);
  }

  return (
    <div className="app">
      <div className="settings">
        <button className="button" onClick={() => handlePreviousStep()}>
          -
        </button>

        <p className="stepCounter">Step: {step}</p>
        <button className="button" onClick={() => handleNextStep()}>
          +
        </button>
      </div>
      <div>
        <div className="settings">
          <button className="button" onClick={() => handlePreviousCount()}>
            -
          </button>

          <p className="stepCounter">Count: {count}</p>
          <button className="button" onClick={() => handleNextCount()}>
            +
          </button>
        </div>
      </div>
      <div className="timer">
        <p>{countDay.toString()}</p>
      </div>
    </div>
  );
}
