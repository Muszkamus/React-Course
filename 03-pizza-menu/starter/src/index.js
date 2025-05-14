import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  // Always upper case
  return (
    <div className="container">
      <Header /> {/*Components*/}
      <Menu />
      <Footer />
    </div>
  );
}
// Components are always functions, always capital letter. Always on top, never nested (inside eachother)

function Header() {
  // const style = { color: "red", fontSize: "40px", texttransform: "uppercase" };
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        <>
          {/*          Instead of putting it in the div, use empty curling braces to do
          fragment and group things together as JSX only allows one element*/}
          <p>Authentic Italian Cousine</p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We are working on our menu</p>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  //props will appear because we have used it above, meaning they are connected
  return (
    // This here is very similar, ternary operator for css styling
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        {" "}
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "Sold Out" : pizzaObj.price}</span>{" "}
        {/*  Setting text conditionally */}
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 23;

  const isOpen = hour >= openHour && hour < closeHour; // This will set Boolean value

  // Conditional Rendering with Multiple returns

  return (
    <footer className="footer">
      {isOpen === true ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        `We're currently closed, we will open at ${openHour}`
      )}
    </footer>
  );
  // return React.createElement("footer", null, "We're currently open");
}

function Order({ closeHour, openHour }) {
  // this is new props method that takes info from the above,
  return (
    <div className="order">
      <p>
        We're open from {openHour} until {closeHour}:00. Come visit us or order
        online
      </p>
      <button className="btn">order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")); // Root is html so this is a link
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // Run React
