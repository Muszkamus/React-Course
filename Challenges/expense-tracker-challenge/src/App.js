import { useState } from "react";

const expenseHistory = [];

// ✅ Milestone 2: Add Totals Summary
// Goal: Show how much is being spent
//  Calculate and display the total amount spent across all expenses.
//  Add a Stats or TotalSummary component under Row.
//  Optionally show total by method (Card vs Cash) or per category.

// ✅ Milestone 3: Delete Functionality
// Goal: Let users remove mistakes
//  Add a ❌ delete button to each row.
//  Create a handleDelete(id) function.
//  Call setExpenses(expenses.filter(e => e.id !== id)) inside it.

// ✅ Milestone 4: Persist Data with localStorage
// Goal: Make expenses survive refresh
//  On first render, check localStorage for saved expenses.
//  If present, use them to set initial state.
//  Use useEffect to save to localStorage every time expenses change.

// ✅ Milestone 5: Add Filtering
// Goal: Make it easier to view relevant expenses
//  Add a dropdown to filter by category or method.
//  Store filter in state.
//  Apply .filter() to expenses before passing to ExpenseHistory.

export default function App() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState(expenseHistory);
  const [isExpenseAdded, setIsExpenseAdded] = useState(false);
  console.log(expenseHistory);
  function addExpense(e) {
    const parsedAmount = parseFloat(amount);
    e.preventDefault();

    if (
      !date ||
      !category ||
      !method ||
      !description ||
      !amount ||
      isNaN(parsedAmount) ||
      parsedAmount < 0
    ) {
      return;
    }
    const uniqueID = new Date().getTime();
    const newExpense = {
      id: uniqueID,
      date,
      category,
      method,
      description,
      amount: parsedAmount,
    };

    if (!date || !category || !method || !description || !amount) {
      return;
    } else {
      setIsExpenseAdded(true);
      setExpenses([...expenses, newExpense]);
      setDate("");
      setCategory("");
      setMethod("");
      setDescription("");
      setAmount("");
      setTimeout(() => {
        setIsExpenseAdded(false);
      }, 3000);
    }
  }

  return (
    <div className="app">
      <div className="expenseColumn">
        <Row />
        <ExpenseHistory expenses={expenses} />
      </div>
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
        isExpenseAdded={isExpenseAdded}
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
function ExpenseHistory({ expenses }) {
  return (
    <>
      {expenses.map((expense) => (
        <div className="existingExpense" key={expense.id}>
          <div className="cell">
            <p>{expense.date}</p>
          </div>
          <div className="cell">
            <p>{expense.category}</p>
          </div>
          <div className="cell">
            <p>{expense.method}</p>
          </div>
          <div className="cell">
            <p>{expense.description}</p>
          </div>
          <div className="cell">
            <p>{expense.amount}</p>
          </div>
        </div>
      ))}
    </>
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
  isExpenseAdded,
}) {
  return (
    <div className="addExpenseBox">
      <div>
        <p>
          Date:
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
            <option value="">-- select a category --</option>
            <option value="Food">Food</option>
            <option value="Subscription">Subscription</option>
            <option value="Fuel">Fuel</option>
          </select>
        </p>
      </div>

      <div>
        <p>
          Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="">-- select a method --</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
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
            inputMode="decimal"
            pattern="^\d+(\.\d{0,2})?$"
            placeholder="0.00"
            value={amount}
            onChange={(e) => {
              // Fix the issue with convertin it into a number
              const value = e.target.value;
              // Allow only numbers and max 2 decimal points
              if (/^\d*(\.\d{0,2})?$/.test(value)) setAmount(value);
            }}
          />
        </p>
      </div>

      <div>
        <button onClick={addExpense}>Add</button>
      </div>

      <div className="expenseSubmitted">
        <p>{isExpenseAdded ? "Expense Submitted!" : ""}</p>
      </div>
    </div>
  );
}
