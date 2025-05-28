import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [countShow, setCountShow] = useState(0); // this is only for UI

  const date = new Date();
  const numericalDate = date.getTime();
  const day = 1000 * 60 * 60 * 24 * count; // Day in numerical value

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const countDay = new Date(numericalDate + day);

  function handleNextCount() {
    setCount((s) => s + step);
    setCountShow((s) => s + 1);
  }

  function handlePreviousCount() {
    setCount((s) => s - step);
    setCountShow((s) => s - 1);
  }
  return (
    <div className="app">
      <div className="settings">
        <input
          type="range"
          min="1"
          max="100"
          value={step}
          class="slider"
          id="myRange"
          onChange={(e) => setStep(Number(e.target.value))} // this allows to change slider
        ></input>
        {/*Now get this swapped with input box*/}
        <p className="stepCounter">Step: {step}</p>
      </div>
      <div>
        <div className="settings">
          <button className="button" onClick={() => handlePreviousCount()}>
            -
          </button>
          <p className="stepCounter">Count: {countShow}</p>
          <button className="button" onClick={() => handleNextCount()}>
            +
          </button>
        </div>
      </div>
      <div className="timer">
        {countDay.getTime() === date.getTime() ? (
          <p>Today is {countDay.toLocaleDateString("en-UK", dateOptions)}</p>
        ) : (
          <p>
            {` ${count} days from today is
            ${countDay.toLocaleDateString("en-UK", dateOptions)}`}
          </p>
        )}
      </div>
    </div>
  );
}
