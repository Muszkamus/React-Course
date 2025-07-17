import { use, useState } from "react";

const expenseHistory = [];

export default function App() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState(expenseHistory);
  const [submittedExpense, setsubmittedExpense] = useState();
  const [isExpenseAdded, setIsExpenseAdded] = useState(false);
  console.log(expenseHistory);
  function addExpense(e) {
    e.preventDefault();
    const uniqueID = new Date().getTime();
    const newExpense = {
      id: uniqueID,
      date,
      category,
      method,
      description,
      amount,

      // Sort out the expense so its added to the main array
    };

    if (!date || !category || !method || !description || !amount) {
      return;
    } else {
      setExpenses([...expenses, newExpense]);
    }
  }

  return (
    <div className="app">
      <Row />
      <AddExpenseBox
        date={date}
        setDate={setDate}
        category={category}
        setCategory={setCategory}
        method={method}
        setMethod={setMethod}
        description={description}
        setDescription={setDescription}
        amount={amount}
        setAmount={setAmount}
        addExpense={addExpense}
      />
    </div>
  );
}

function Row() {
  return (
    <div className="row">
      <div className="cell">
        <p>Date</p>
      </div>
      <div className="cell">
        <p>Category</p>
      </div>
      <div className="cell">
        <p>Method</p>
      </div>
      <div className="cell">
        <p>Description</p>
      </div>
      <div className="cell">
        <p>Amount</p>
      </div>
    </div>
  );
}

function AddExpenseBox({
  date,
  setDate,
  category,
  setCategory,
  method,
  setMethod,
  description,
  setDescription,
  amount,
  setAmount,
  addExpense,
}) {
  return (
    <div className="addExpenseBox">
      <div>
        <p>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </p>
      </div>

      <div>
        <p>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Subscription</option>
            <option>Fuel</option>
          </select>
        </p>
      </div>

      <div>
        <p>
          Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option>Card</option>
            <option>Cash</option>
          </select>
        </p>
      </div>
      <div>
        <p>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </p>
      </div>

      <div>
        <p>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </p>
      </div>
      <div>
        <button onClick={addExpense}>Add</button>
      </div>
    </div>
  );
}
