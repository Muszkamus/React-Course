import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
        //console.log("tick");
      }, 1000);

      return () => clearInterval(id); // clean up function
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 ? 0 : null}
      {mins}:{seconds < 10 ? 0 : null}
      {seconds}
    </div>
  );
}

export default Timer;
