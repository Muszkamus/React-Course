import { useQuiz } from "../contexts/Context";

function Nextbutton() {
  const {
    index,
    answer,

    dispatch,
    numQuestions,
  } = useQuiz();

  if (answer === null) return;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default Nextbutton;
