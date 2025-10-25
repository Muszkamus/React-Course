import { useContext, createContext, useState } from "react";

/* ============================================================
   1️⃣  Create a Context
   ============================================================ 
   Context provides a way to share state (count, increase, decrease)
   between the parent <Counter> and all nested child components,
   without having to pass props down manually at every level.
   */
const CounterContext = createContext();

/* ============================================================
   2️⃣  Create the Parent Component
   ============================================================ 
   <Counter> holds the shared state and logic for incrementing
   or decrementing. It exposes these via the context provider,
   so that its child components can access them directly.
   */
function Counter({ children }) {
  const [count, setCount] = useState(0);

  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    // The context provider makes count, increase, and decrease
    // available to all nested child components.
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

/* ============================================================
   3️⃣  Create Child Components
   ============================================================ 
   Each subcomponent consumes the shared context, so they can
   use the counter’s state or actions independently.
   This keeps each part reusable and self-contained.
   */

// Displays the current count
function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}

// Displays a text label (purely presentational)
function Label({ children }) {
  return <span>{children}</span>;
}

// Button to increase the count
function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}

// Button to decrease the count
function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}

/* ============================================================
   4️⃣  Attach Child Components as Properties of the Parent
   ============================================================ 
   This allows usage like:
     <Counter>
       <Counter.Decrease icon="-" />
       <Counter.Count />
       <Counter.Increase icon="+" />
       <Counter.Label>My Counter</Counter.Label>
     </Counter>

   → This creates a natural, declarative API that mirrors HTML structure.
   */
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

/* ============================================================
   5️⃣  Export the Compound Component
   ============================================================ */
export default Counter;
