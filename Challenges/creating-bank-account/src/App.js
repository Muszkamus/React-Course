import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  previouslyRequestedLoan: false,
};

export default function App() {
  function reducer(state, action) {
    if (!state.isActive && action.type !== "opened") return state;

    switch (action.type) {
      case "closed":
        if (state.balance !== 0 || state.loan !== 0) return state;
        return {
          ...state,
          balance: 0,
          loan: 0,
          isActive: false,
        };
      case "opened":
        return {
          ...state,
          balance: 500,
          isActive: true,
        };
      case "deposit":
        return {
          ...state,
          balance: state.balance + action.payload,
        };
      case "withdraw":
        return {
          ...state,
          balance: state.balance - action.payload,
        };
      case "requestLoan":
        return {
          ...state,
          previouslyRequestedLoan: true,
          loan: state.loan + action.payload,
        };
      case "payLoan":
        return {
          ...state,
          balance: state.balance - state.loan,
          loan: 0,
        };
      default:
        throw new Error("unkown action");
    }
  }

  const depositAmount = 150;
  const withdrawalAmount = 50;
  const loanAmount = 500;

  const [{ balance, loan, isActive, previouslyRequestedLoan }, dispatch] =
    useReducer(reducer, initialState);

  function openBankAccount() {
    dispatch({ type: "opened" });
  }

  function depositMoney(val) {
    if (isActive === false) return;
    dispatch({ type: "deposit", payload: val });
  }

  function withdrawMoney(val) {
    if (val > balance) return;
    dispatch({ type: "withdraw", payload: val });
  }
  function requestLoan(val) {
    if (previouslyRequestedLoan === true) return;
    dispatch({ type: "requestLoan", payload: val });
  }
  function payLoan(val) {
    dispatch({ type: "payLoan", payload: val });
  }

  function closeBankAccount() {
    if (loan !== 0 && balance !== 0) return;
    dispatch({ type: "closed" });
  }
  console.log(balance);

  return (
    <div className="app">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          className="button"
          onClick={() => {
            openBankAccount();
          }}
          disabled={isActive === true ? true : false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => {
            depositMoney(depositAmount);
          }}
          disabled={isActive !== true ? true : false}
        >
          Deposit {depositAmount}
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => {
            withdrawMoney(withdrawalAmount);
          }}
          disabled={
            (isActive === true ? false : true) ||
            (balance < withdrawalAmount && true)
          }
        >
          Withdraw {withdrawalAmount}
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => {
            requestLoan(loanAmount);
          }}
          disabled={isActive !== true || previouslyRequestedLoan !== false}
        >
          Request a loan of {loanAmount}
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => {
            payLoan(loanAmount);
          }}
          disabled={isActive !== true || (loan === 0 && true)}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => closeBankAccount()}
          disabled={
            (isActive === true ? false : true) ||
            (balance !== 0 && true) ||
            (loan !== 0 && true)
          }
        >
          Close account
        </button>
      </p>
    </div>
  );
}
