<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD025 -->
<!-- markdownlint-disable MD026 -->
<!-- markdownlint-disable MD033 -->

# <center> **Section 3: A first look at React**

---

# 11. **What is React?**

---

- **Based on components:** Heavily reusable areas like nav, buttons, pictures, anything we see
- **Declarative:** We describe how components look like and how they work using JSX based on current data/state. React is basically abstraction from standard DOM. JSX Handles all HTML/CSS/JS
- **State-Driven**: State (Array of apartments) > Render > UI (Components in JSX) > Update State > Repeat

---

# 13. **Pure React**

---

Scenario below is not really how React is done (I have no idea what's going on) Come back to it late

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello React!</title>
  </head>
  <body>
    <div id="root"></div>

    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <script>
      function App() {
        //const time = new Date().toLocaleTimeString();
        const [time, setTime] = React.useState(new Date().toLocaleTimeString());

        React.useEffect(function () {
          setInterval(function () {
            setTime(new Date().toLocaleTimeString());
          });
        }, 1000);

        return React.createElement("header", null, `Hello React! It's ${time}`);
      }

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(React.createElement(App));
    </script>
  </body>
</html>

```

---

# 15. **Setting Up and New React Project: The options**

---

- **Create React App**
- Complete starter kit
- Everything already configured: ESLint, Prettier etc.
- However, not used at all as it's slow and outdated.

- **Vite**
- Real world apps
- Modern build tool that ocntains starter template
- Manual set up
- Extremely fast with refreshing, bundling

---

# <center> **Review of Esseitnal Javascript for React**

---

# 18. **Destructuring Objects and Arrays**

---

```js
// ---------- Simple destructuring objects
const book = getBook(1); //Choose the object

const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
  book; // On the left, we choose the objects within the object

console.log(title, author, pages, publicationDate, genres, hasMovieAdaptation);

// Simple destructuring arrays

const [primaryGenre, secondaryGenre] = genres;
console.log(primaryGenre, secondaryGenre);
```

---

# 19. **Rest/Spread Operator**

---

```js
//------- Rest Operator
const [primaryGenre, secondaryGenre, ...otherGenres] = genres; // Always at the end, choosing the rest of the arguments/data
console.log(otherGenres);

// ---- Spread operator
const newGenres = [...genres, "new added epic fantasy"]; // This simplt spreads genres, making everything equal
console.log(newGenres);

const updateBook = {
  ...book,
  // Adding new property
  moviePublicationDate: "2001-12-19",
  //Changing existing property
  pages: 1210,
};
updateBook;
```

---

# 20. **Ternary Operators**

---

```js
// ------- Ternary operator
//1. Choose the condition (if statements) 2. If true do this 3. IF false then do thiss
pages > 1000 ? "Over a thousand pages" : "Less than a thousand pages";
```

---

# 21. **Arrow Functions**

```js
const foo = (value) => value + 2;
console.log(foo(2)); // = 4
```

---

# 23. **Short-Circuiting And Logical Operators: &&, ||, ??**

---

```js
// falsy: 0, null, "",undefined

// Short circuting (if the value is true)
console.log(true && "some value");
console.log(false && "some value");
console.log(hasMovieAdaptation && "This book has a movie");

// Or (if the value is false)
console.log(true || "some string"); // true
console.log(false || "some string"); // some string

const spanishTranslation =
  book.translations.spanish || "Not translated in spanish";
console.log(spanishTranslation);

// This one throws aways any falsy value as the argument we give
console.log(book.reviews.librarything.reviewsCount);
const countWrong = book.reviews.librarything.reviewsCount || "No Data";
countWrong; // No data
// This one only accepts null or undefined
const count = book.reviews.librarything.reviewsCount ?? "No data";
```

---

# 24. **Optional Chaining**

---

```js
function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads.reviewsCount;
  const librarything = book.reviews.librarything?.reviewsCount ?? 0; // If anything after question mark is non existent, we swap it with whats after ??
  return goodreads + librarything;
}

console.log(getTotalReviewCount(book));
```

---

# 25. **The Array map Method**

---

```js
const x = [1, 2, 3, 4, 5].map((el) => el * 2);

const titles = books.map((book) => book.title); // map is basically loop, but for objects

const essentialData = books.map((book) => ({
  // Here we can go through the whole object, and pick what we want from the ID which is specific name

  title: book.title, // Name of what we want to print > whatever we want to print
  author: book.author,
  reviewsCount: getTotalReviewCount(book),
}));
essentialData;
```

---

# 26. **The array filter Method**

```js
// First is to choose argument, then where we get it from and lastly, condition. It needs to be true
const longBooksWithMovie = books
  .filter((book) => book.pages > 500) // && can be used as well
  .filter((book) => book.hasMovieAdaptation);
// Very similar to map, but this one is quicker with if statement included

console.log(longBooksWithMovie);

const adventureBooks = books
  .filter((books) => books.genres.includes("adventure"))
  .map((book) => book.title); // chose to only show titles
console.log(adventureBooks);
```

---

# 27. **The Array reduce Method**

---

```js
// Acc is cumulator of the value
const pagesAllBooks = books.reduce((sum, book) => sum + book.pages, 0); // Reduce always gives only one value. We need accumulator, and then function
```

---

# 28. **The Array sort Method**

---

```js
// ---------- 28. The Array sort Method

// Mutated

const arr = [9, 2, 7, 4, 2];
const sorted = arr.sort((a, b) => a - b); //JS goes through the array, it calls this function, if it is "-" = Ascending
sorted;
arr; // Sort function mutated original array

// Not mutated

const arr2 = [9, 2, 7, 4, 2];
const sorted2 = arr.slice().sort((a, b) => a - b); //JS goes through the array, it calls this function, if it is -: Ascending
sorted2;
arr2; // Not mutated due to slice function that does nothing, but makes JS not mutate original array

const sortedPages = books.slice().sort((a, b) => a.pages - b.pages);
sortedPages;
```

---

# 29. **Working With Immutable Arrays**

---

```js
// 1) Add book object to array

const newBook = {
  id: 6,
  title: "Harry Potter and Wizards of Harry",
  author: "J. K. Rowling",
};
const booksAfterAdd = [...books, newBook]; // Spread operator and add extra object in the array

// 2) Delete book object from array

const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3); // only include books whose id is not 3
booksAfterDelete;

// 3) Update book object in the array

const booksAfterUpdate = booksAfterDelete.map(
  (book) => (book.id === 1 ? { ...book, pages: 1 } : book) // Basically loops through the book, checks for book id 2, if if exists then spread this book component,
  // changes pages:1 (because it already exists). Anything other than that, keep the book as it is.
);
booksAfterUpdate;
```

---

# 30. **Asynchronous JavaScript: Promises**

---

```js
fetch("https://jsonplaceholder.typicode.com/todos/1") // 1. Make a GET request to the API endpoint
  .then((response) => response.json()) // 2. Convert the raw HTTP response into usable JSON
  .then((data) => console.log(data)); // 3. Use the parsed JSON data (here we just log it)

js;
```

# 31. **Asynchronous JavaScript: Async/Await**

---

```js
// 31. Asynchronous JavaScript: Async/Await ( Better)
async function getTodos() {
  // Makes the code asynchronous
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1"); // Fetching API
  const data = await res.json(); // Stores json in the variable
  console.log(data);
}

getTodos();
```

---

# <centre> **Section 5: Working With Components, Props, and JSX**

---

# 33. **Rendering the Root Component and Strict Mode**

---

First > Create React App

// Index.js needs to be created and is the most important file to run inside src folder. It needs to be called like this

**npx create-react-app my-app
cd my-app
npm start**

Index.js folder below needs to be like this in order for React to run

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  // Always upper case
  return <h1>Hello React</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root")); // Root is in main html so this is a link
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // Run React
```

---

# 35. **Components as building blocks**

---

- They are the most fundamental parts of React.
- React applications are entirely made out of components.
- Building blocks of user interfaces in React
- Piece of UI that has its own data, logic and appearance.
- Components can be reused, nested inside each other and pass data between them

---

# 36. **Creating And Reusing a Component**

---

```js
import React from "react";
import ReactDOM from "react-dom/client";

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
    <div>
      <h1>Hello React</h1>
      <Pizza />
      <Pizza /> {/* This is easily copied */}
    </div>
  );
}

// Components are always functions, always capital letter. Always on top, never nested (inside eachother)
function Pizza() {
  return (
    <div>
      <img src="/pizzas/spinaci.jpg" alt="Pizza spinaci" />
      <h2>Pizza Spinaci</h2>
      <p>"Tomato, mozarella, spinach, and ricotta cheese"</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")); // Root is html so this is a link
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // Run React
```

---

# 37. **What is JSX?**

---

- Declarative Syntax to describe what components look like and how they work
- components must return a block of JSX
- Extension of JS that allows us to embed JavaScript, CSS and React components into HTML
- Each JSX element is converted to a React.createelement function call
- We could use React without JSC (not fun)

- **JSX is Declarative**

**Imperative> Vanilla** JS with get element ID or query selector

- Manual DOM element sections and DOM traversing
- Step by step DOM mutations until we reach the desired UI

- **Declarative**
- Describe what UI should look like using JSX, based on current data
- React is an abstraction away from DOM: we never touch the DOM

---

# 38. **Creating More Components**

---

```js
import React from "react";
import ReactDOM from "react-dom/client";

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
    <div>
      <Header /> {/*Components*/}
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>Fast React Pizza Co.</h1>;
}
function Menu() {
  return (
    <div>
      <h2>Our Menu</h2>
      <Pizza />
    </div>
  );
}
function Footer() {
  return (
    <footer>{new Date().toLocaleTimeString()}. We're currently open</footer>
  );
  // return React.createElement("footer", null, "We're currently open");
}

// Components are always functions, always capital letter. Always on top, never nested (inside eachother)
function Pizza() {
  return (
    <div>
      <img src="/pizzas/spinaci.jpg" alt="Pizza spinaci" />
      <h2>Pizza Spinaci</h2>
      <p>"Tomato, mozarella, spinach, and ricotta cheese"</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")); // Root is html so this is a link
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // Run React
```

---

# 39. **JavaScript Logic in Components**

---

```js
function Header() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;

  const isOpen = hour >= openHour && hour < closeHour; // This will set Boolean value
  console.log(isOpen);

  return <h1>Fast React Pizza Co.</h1>;
}
```

---

# 40. **Seperation of concerns**

---

- Vanilla JS > One technilogy per file (HTML,CSS,JS)
- React > One component per file (Header, Filter, Menu etc.)

---

# 41. **Styling React Applications**

---

```js
function App() {
  // Always upper case
  return (
    <div className="container">
      {/* Always use className and then refer to CSS styling*/}
      <Header /> {/*Components*/}
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "40px", texttransform: "uppercase" }; // This one is easy but messy for later use
  const style = {};
  b;
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}
```

---

# 42. **Passing and Receiving Props**

---

```js
function Menu() {
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="/pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushrooms"
        price={10}
        photoName="pizzas/funghi.jpg"
      />
    </div>
  );
}

function Pizza(props) {
  //props will appear because we have used it above, meaning they are connected
  console.log(props);
  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name} />
      <div>
        {" "}
        <h3>{props.name}</h3>
        <p>{props.ingredients}</p>
        <span>{props.price}</span>
      </div>
    </div>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;

  const isOpen = hour >= openHour && hour < closeHour; // This will set Boolean value

  return (
    <footer className="footer">
      {isOpen === true ? "We're open" : "We're closed"}
    </footer>
  );
  // return React.createElement("footer", null, "We're currently open");
}
```

---

# 43. **Props, Immutability, and One-Way data flow**

---

- Props are used to pass data from parent componens to child components (down the component tree)
- Essential tool to configure and customize components (like function parameters)
- With props, parent components control how child components look and work
- Anything can be passed as props, single values, arrays, objects, functions and even other components.

## Props are immutable, while states are

- React uses one way data flow from Parent to child
- One way data flow is more performant, makes apps easier to debug and makes it predicatble.

---

# 44. Challenge. Profile card

DONE

---

# 45. **The Rules of JSX**

---

## **General JSX Rules**

- JSC works essentially like HTML, but we can enter "JS mode" by using {}
- We can place JS expressions inside {}. Examples: reference variables, create arrays or objects, [].map(), ternary operator
- Statements are not allowed (if/else. for, switch)
- JSX produces a JavaScript expression

---

# 46. **Rendering lists**

---

```js
// This code maps over the pizzaData array.
// For each pizza object, it renders a <Pizza /> component.
// It passes the pizza object as a prop named pizzaObj.
// A unique key (here, the pizza name) is used to help React track items in the list.
<ul className="pizzas">
  {pizzaData.map((pizza) => (
    <Pizza pizzaObj={pizza} key={pizza.name} />
  ))}
</ul>
```

```js
// This functional component receives a pizzaObj via props.
// It displays the pizza's image, name, ingredients, and price.
function Pizza(props) {
  //props will appear because we have used it above, meaning they are connected
  return (
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        {" "}
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </li>
  );
}
```

---

# 47. **Conditional Rendering With &&**

```js
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {numPizzas > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We are working on our menu</p>
      )}
    </main>
  );
}
```

---

# 51. **Destructuring Objects**

```js
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
  // Props are read-only: Order uses them but does not modify them.
  // Props can be any data type: Here, both closeHour and openHour are numbers.
  // Parent → Child direction: Props flow one way — Footer (parent) gives data to Order (child).
  // Destructuring makes code cleaner: Instead of props.openHour, you just use openHour.
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
```

---

# 52. **React Fragment**

```js
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        <>
          {/*          Instead of putting it in the div, use empty curling braces to do
          fragment and group things together as JSX only allows one element
          Basically, we have <p> and <ul> in the same format */}
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
```

---

# 53. **Setting Classes and Text Conditionally**

---

```js
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
        <span>{pizzaObj.soldOut ? "Sold Out" : pizzaObj.price}</span> {/*  Setting text conditionally */}
      </div>
    </li>
  );
}
```

---

# 55. **Challenge 2**

```js
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
```

---

# <centre> Section 6: **State, Events, and Forms: Interactive Components**

---

```js
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const step = 2;
  return (
    <div className="steps">
      <div className="numbers">
        <div className={step >= 1 && "active"}>1</div>
        <div className={step >= 2 && "active"}>2</div>
        <div className={step >= 3 && "active"}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button style={{ backgroundColor: "#7950f2", color: "fff" }}>
          Previous
        </button>
        <button style={{ backgroundColor: "#7950f2", color: "fff" }}>
          Next
        </button>
      </div>
    </div>
  );
}
```

---

# 59. **What is state in React?**

---

- state is a data that component can hold over time, necessary for information that it needs to remember throughout the app's lifecycle.
- Component's memory!
- State variable/piece of state: A single variable in a component (component state)
- Updating component state triggers React to re-render the component

---

# 60. **Creating a State Variable With useState**

---

```js
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);

  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }
  function handleNext() {
    if (step < 3) setStep(step + 1);
  }
  return (
    <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button
          style={{ backgroundColor: "#7950f2", color: "fff" }}
          onClick={handlePrevious}
          // onMouseEnter={() => console.log("Enter")}
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: "#7950f2", color: "fff" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

---

# 62. **The Mechanics of state**

---

- Because React is declarative, We don't do direct DOM manipulations
- In React, a view is updated by re-rendering the component
- A component is re-rendered when its state is updated

---

# 68. **Second Challenge**

---

```js
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

  function handleNextStep() {
    setStep((s) => s + 1);
  }

  function handlePreviousStep() {
    setStep((s) => s - 1);
  }

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
```

---

# 70. **Building a layout**

---

```js
import React from "react";

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far away👜</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h3>Wha do you need for your trip? 😊</h3>
    </div>
  );
}
function PackingList() {
  return <div className="list">LIST</div>;
}
function Stats() {
  return (
    <footer className="stats">
      <em> You have X items on your list, and you already packed X(%) </em>
    </footer>
  );
}
```

---

# 71. **Rendering the Items List**

---

```js
import React from "react";

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far away👜</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h3>Wha do you need for your trip? 😊</h3>
    </div>
  );
}
function PackingList() {
  return <div className="list">LIST</div>;
}
function Stats() {
  return (
    <footer className="stats">
      <em> You have X items on your list, and you already packed X(%) </em>
    </footer>
  );
}
```

---

# 72. **Building a Form and Handling Submissions**

---

```js
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {" This will work because we can press Enter and it will work as well "}

      <h3>What do you need for your trip? 😊</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..."></input>
      <button>Add</button>
    </form>
  );
}
```

---

# 73. **Controlled Elements**

---

```js
import React, { use, useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far away👜</h1>;
}
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // Prevents reload of the page
    if (!description) return; // If it is empty the do nothing
    const newItem = { description, quantity, packed: false, id: Date.now() }; // Create new Item based on the states
    console.log(newItem);

    setDescription(""); // Sets back to original state
    setQuantity(1); // Same
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😊</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Using state to set something new
        // e.target.value is basically any value that we have inside, very important to remember as we can pass it on further
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => {
          return <Item item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em> You have X items on your list, and you already packed X(%) </em>
    </footer>
  );
}
```

---

# 74. **States vs Props**

---

| **State**                                    | **Props**                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| Internal data, owned by component            | External data, owned by parent component                                  |
| Component memory                             | Similar to function parameters                                            |
| Can be updated by the component itself       | Read only                                                                 |
| Updating state causes component to re-render | Receiving new props causes re-render. Usually when parent's state updates |
| Used to make components interactive          |                                                                           |

**State State is like the component's personal memory — used for dynamic behavior. A component controls and updates its own state using useState or setState. When changed, it causes that component to re-render.**

**Props Props are like inputs from the parent. They are passed down and cannot be changed by the receiving (child) component. If the parent updates its state and passes down new props, the child re-renders accordingly.**

- State = local, mutable, controls interactivity.
- Props = external, read-only, passed from parent.
- They work together: Parent manages state ➝ passes via props ➝ child uses props to display or trigger changes (often calling parent functions

---

# 76. **Flashcards exercise**

---

```js
import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  // This line sets up state to keep track of the currently selected flashcard's ID
  // At first, no card is selected, so it's initialized to null
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    // If the clicked card's ID is not the current selected one,
    // update selectedId to that ID (show the answer)
    // If it is already selected, set it to null (hide the answer)
    setSelectedId(id !== selectedId ? id : null);
  }

  return (
    <div className="flashcards">
      {questions.map((q) => (
        <div
          key={q.id}
          onClick={() => handleClick(q.id)}
          // Add a CSS class if this card is currently selected
          className={q.id === selectedId ? "selected" : ""}
        >
          <p>
            {/* Show the answer if this card is selected, otherwise show the question */}
            {q.id === selectedId ? q.answer : q.question}
          </p>
        </div>
      ))}
    </div>
  );
}
```

---

# Second Timer Challenge

---

```js
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
  function resetTimer() {
    setCount(() => 0);
    setCountShow(() => 0);
    setStep(() => 1);
  }
  return (
    <div className="app">
      <div className="settings">
        <input
          className="slider"
          type="range"
          min="1"
          max="100"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))} // this allows to change slider
        ></input>
        {/*Now get this swapped with input box*/}
        <p className="stepCounter">{step}</p>
      </div>
      <div>
        <div className="settings">
          <button className="button" onClick={() => handlePreviousCount()}>
            -
          </button>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))} // Using state to set something new
            // e.target.value is basically any value that we have inside, very important to remember as we can pass it on further
          ></input>
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
      {count >= 1 || step > 1 ? (
        <button className="resetButton" onClick={() => resetTimer()}>
          Reset
        </button>
      ) : null}
    </div>
  );
}
```

---

# <centre> **Section 7: Thinking in React: State Management**

---

# 78. **What is "Thinking in React?**

---

- React Mindset > state,data flow, effects, etc.
- Thinking in state transitions, not element mutations.

### Break the desired UI into components and extablish the components tree

### Build a static version in React (without state)

### Think about state:

- When to use state
- Types to place each piece of state

### Extablish data flow

- One-way data flow
- Child to parent communication
- Accessing global state

- Thinking in React

---

# 79. **Fundamentals of state Management**

---

| **Local State**                                                                                                            | **Global State**                                                             |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| State needed only by one or few components                                                                                 | State that many components might need                                        |
| State that is defined in a component and only that component and child components have access to it (by passing via props) | Shared state that is accessible to every component in the entire application |

---

# 80. **Thinking About State and Lifting State Up**

---

![image info](./image.png)

---

# 84. **Derived State**

---

![alt text](image-1.png)

## 🧠 React: Deriving State – Crucial Notes

### ❌ Problem: Redundant State

```js
const [cart, setCart] = useState([...]);
const [numItems, setNumItems] = useState(2);
const [totalPrice, setTotalPrice] = useState(30.98);
```

**numItems and totalPrice are derived from cart, but stored separately.**

Leads to:

- Manual sync maintenance
- Multiple re-renders
- Higher bug risk

✅ Solution: Derive State from Source

```js
const [cart, setCart] = useState([...]);

const numItems = cart.length;
const totalPrice = cart.reduce((acc, cur) => acc + cur.price, 0);
```

cart is the single source of truth

Derived values are just variables, not state

💡 Key Principles

### Only use useState when:

- Value changes independently
- It's user-controlled

### Derive everything else from existing state or props

✅ Benefits

- Fewer re-renders
- Simpler code
- Less chance of bugs
- Values always in sync

---

# 85. **Calculating Statistics as Derived State**

---

```js
function Stats({ items }) {
  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((numPackedItems / numItems) * 100);
  const renderItems = function () {
    if (numItems === 0) {
      return <em>You have no items on your list</em>;
    } else if (numItems === 1 && numPackedItems === 0) {
      return (
        <em>
          You have {numItems} item on your list, and you already packed{" "}
          {numPackedItems} ({percentagePacked}%)
        </em>
      );
    } else if (numItems === numPackedItems) {
      return <em>All packed and ready to go! ✈️</em>;
    } else {
      return (
        <em>
          You have {numItems} items on your list, and you already packed{" "}
          {numPackedItems} ({percentagePacked}%)
        </em>
      );
    }
  };

  return <footer className="stats">{renderItems()}</footer>;
}
```

---

# 86. **Sorting Items**

---

```js
let sortedItems;

if (sortBy === "input") sortedItems = items; // If the user chooses to sort by "input", return the original array — no sorting.
if (sortBy === "description")
  sortedItems = items
    .slice()
    .sort((a, b) => a.description.localeCompare(b.description)); // Slice not to mutate, localeCompare() is a string-safe alphabetical comparator (handles casing and locale).
if (sortBy === "packed")
  sortedItems = items
    .slice()
    .sort((a, b) => Number(a.packed) - Number(b.packed)); // a.packed is a boolean, so Number(a.packed) converts it to: false → 0 > true → 1
// //So this sorts: Unpacked items (0) first > Packed items (1) last

<div className="actions" onChange={(e) => setSortBy(e.target.value)}>
  <select value={sortBy}>
    <option value="input">Sort by input order</option>
    <option value="description">Sort by description</option>
    <option value="packed">Sort by packed status</option>
  </select>
</div>;
```

---

# 87. **Clearing the list**

---

```js
function handleDeleteAllItems(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete all items?"
  );

  if (confirmed) setItems([]);
}
```

---

# 88. **Moving Components Into Seperate Files**

---

- When exporting component > right click on it and Refactor to a new file

- When exporting, make sure to export default and remove extra curly braces in the other components when importing

---

# 89. **Exercise #1: Accordion Component (v1)**

---

```js
import React, { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return <Accordion data={faqs} />; // Make data as a prop to the above FAQS array
}

function Accordion({ data }) {
  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem title={el.title} text={el.text} num={i} key={el.title} /> // scanning each item and mapping them
      ))}
    </div>
  );
}

function AccordionItem({ num, title, text }) {
  // Passing props
  const [isOpen, setisOpen] = useState(); // State

  function handleToggle() {
    setisOpen((isOpen) => !isOpen); // Toggling between true and false
  }
  return (
    <div className={`item ${isOpen ? "open " : null}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <p className="content-box">{text}</p>}
    </div>
  );
}
```

---

# 90. **The "children Prop: Making a Reusable Button**

---

![alt text](image-2.png)

```js
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  // const [stateVariable, setStateVariable] = useState(initialValue);

  const [step, setStep] = useState(1); // 'step' holds the current step number; 'setStep' updates it
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }
  return (
    // Fragmentation
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="fff" onClick={handlePrevious}>
              <span>⏮️</span> Previous
            </Button>

            <Button bgColor="#7950f2" textColor="fff" onClick={handleNext}>
              <span>Next</span>⏭️{" "}
              {/* 
  Anything written between a component’s opening and closing tags
  becomes `props.children`. It's a built-in React prop.
  This lets us inject custom JSX content into reusable components.
*/}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}{" "}
      {/* " Children is predefined for React so it has to be named this" */}
    </button>
  );
}
```

---

# 92. **Exercise 2: Accordion Component (v2)**

---

```js
import React, { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return <Accordion data={faqs} />; // Make data as a prop to the above FAQS array
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null); // State
  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          num={i}
          key={el.title}
        >
          {el.text}
        </AccordionItem> // scanning each item and mapping them
      ))}
    </div>
  );
}

function AccordionItem({ num, title, curOpen, onOpen, children }) {
  // Passing props

  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }
  return (
    <div className={`item ${isOpen ? "open " : null}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <p className="content-box">{children}</p>}
    </div>
  );
}
```

---

# 93. **Challenge- Tip Calculator**

---

```js
import { useState } from "react";

const serviceData = [
  {
    id: 1,
    text: "Dissatisfied (0%)",
    value: 0,
  },
  {
    id: 2,
    text: "It was okay (5%)",
    value: 0.05,
  },
  {
    id: 3,
    text: "It was good (10%)",
    value: 0.1,
  },
  {
    id: 4,
    text: "Absolutely Amazing! (20%)",
    value: 0.2,
  },
];

export default function App() {
  const [bill, setBill] = useState(0);
  const [service, setService] = useState(0);
  const [friendRating, setFriendRating] = useState(0);

  function resetAll() {
    setBill(0);
    setService(0);
    setFriendRating(0);
  }

  return (
    <div>
      <Bill bill={bill} setBill={setBill} />
      <ServiceRating
        serviceData={serviceData}
        service={service}
        setService={setService}
      />
      <FriendRecommendation
        serviceData={serviceData}
        friendRating={friendRating}
        setFriendRating={setFriendRating}
      />
      <TotalBill
        bill={bill}
        setBill={setBill}
        serviceData={serviceData}
        service={service}
        friendRating={friendRating}
        setFriendRating={setFriendRating}
        resetAll={resetAll}
      />
    </div>
  );
}
function DropDown({ value, setValue }) {
  return (
    <select onChange={(e) => setValue(Number(e.target.value))} value={value}>
      {serviceData.map((i) => (
        <option key={i.id} value={i.value}>
          {i.text}
        </option>
      ))}
    </select>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <p className="text">
        How much was the bill?
        <input
          type="number"
          placeholder=""
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        ></input>
      </p>
    </div>
  );
}

function ServiceRating({ service, setService }) {
  return (
    <div>
      <p className="text">
        How much did you like the service?
        <DropDown value={service} setValue={setService} />
      </p>
    </div>
  );
}

function FriendRecommendation({ friendRating, setFriendRating }) {
  return (
    <div>
      <p className="text">
        How much did your friend like the service?
        <DropDown value={friendRating} setValue={setFriendRating} />
      </p>
    </div>
  );
}
function TotalBill({ bill, service, friendRating, resetAll }) {
  const numericBill = Number(bill);
  const finalService = numericBill * service;
  const finalFriendRating = numericBill * friendRating;

  return (
    <div>
      <p className="textBill">
        You Pay - £{numericBill === "" ? "0" : numericBill} (£
        {numericBill === "" ? "0" : numericBill} +{(
          finalService + finalFriendRating
        ).toFixed(2)} tip)
      </p>
      <button onClick={resetAll}>Reset</button>
    </div>
  );
}
```

---

# <centre> **Section 8. Practice Project: Eat-N-Split**

---

```js
import { use, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));

    setShowAddFriend(false);
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            selectedFriend={selectedFriend}
            onSelection={onSelection}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} £{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you £{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setbill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setbill(Number(e.target.value))}
      />
      <label>⭕ Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>👯{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>Who is paying the bill? </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
```

---

# <centre> **Section 10: Thinking in React: Components, Composition, and Reusability**

---

# 107. **How to Split a UI Into Components**

---

![alt text](image-3.png)

![alt text](image-4.png)

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)

---

# 108. **Splitting Components in Practice**

---

```js
import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  return (
    <>
      <NavBar />
      <Main />
    </>
  );
}

function NavBar() {
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <Search />
        <NumResults />
      </nav>
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}

function Main() {
  return (
    <main className="main">
      <ListBox />
      <WatchedBox />
    </main>
  );
}

function ListBox() {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MovieList />}
    </div>
  );
}

function MovieList() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedBox() {
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
```

---

# 109. **Component Categories**

---

![alt text](image-9.png)

---

# 110. **Prop Drilling**

---

## 🧠 What is Prop Drilling?

Prop drilling happens when you pass data (via props) from a top-level component down to deeply nested child components — even if some components in between don’t need that data themselves. It’s like handing a note through several people just to reach the person who actually needs it.

## 🧱 Why Is Prop Drilling a Problem?

- Clutters components: Intermediate components must accept and pass along props they don’t use.

- Harder to manage: If many levels are involved, it becomes difficult to track and update data flow.

- Reduces reusability: Components become tightly coupled to specific data paths.

```js
// App → Parent → Child → Grandchild (only Grandchild needs the user)

export default function App() {
  const user = { name: "Radek", role: "Developer" };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <Grandchild user={user} />;
}

function Grandchild({ user }) {
  return <p>Hello, {user.name}!</p>;
}
```

---

# 111. **Component Composition**

---

## ![alt text](image-10.png)

---

# 112. **Fixing Prop Drilling With Composition(And building A Layout)**

---

```js
<NavBar>
  <Search />
  <NumResults movies={movies} />
</NavBar>
```

```js
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
```

## ✅ NavBar no longer needs to "carry" props it doesn't use.

## 🧱 Why This Is Better

Makes components like NavBar, Main, or ListBox reusable.

Avoids cluttering intermediate components with unused props.

Keeps data closer to where it’s actually needed.

## 💡 Rule of Thumb

- Use this When?
  props When component needs specific data
  children When component wraps or structures UI
  context When data is needed in many places

## 🧰 Reusable Template (For Future)

```js
function Wrapper({ children }) {
  return <div className="wrapper">{children}</div>;
}

// Usage:
<Wrapper>
  <Content />
</Wrapper>;
```

---

# 113. **Using Composition to Make a Reusable Box**

---

```js
export default function App() {
  const [watched, setWatched] = useState(tempWatchedData);

  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
```

---

# 115. **Building a Reusable Star Rating Component**

---

```js
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StartRating maxRating={5} />
    <StartRating maxRating={10} />
    <StartRating />
  </React.StrictMode>
);
```

```js
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

export default function StartRating({ maxRating = 5 }) {
  // Here we are setting default value in prop, if it is not chosen in the index file
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
}
```

---

# 116. **Creating the Stars**

---

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
// import "./index.css";
// import App from "./App";

import StarRating from "./StarRating";
function Test() {
  const [movieRating, setmMovieRating] = useState(0);
  return (
    <div>
      <StarRating
        color="blue"
        maxRating={10}
        // We pass setMovieRating as the onSetRating prop.
        // This allows the StarRating component to update state in the parent (Test) when a star is clicked.
        // Inside StarRating, calling onSetRating(rating) triggers setMovieRating(rating) here.
        // State name is const [rating, setRating] = useState(defaultRating);

        onSetRating={setmMovieRating}
      />
      <p> This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />

    <StarRating
      maxRating={5}
      color={"green"}
      size={20}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />

    <Test />
  </React.StrictMode>
);

import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

export default function StartRating({ maxRating = 5 }) {
  const [rating, setRating] = useState();
  const [tempRating, setTempRating] = useState();

  function handleRating(rating) {
    setRating(rating);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from(
          { length: maxRating },
          (
            _,
            i // index i = is the star that we have clicked
          ) => (
            <span key={i}>
              <Star
                // Show star as full if either:
                // - tempRating is active (hover effect)
                // - or the actual rating is high enough
                full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                // When clicked, set the rating to (i + 1)
                onRate={() => handleRating(i + 1)}
                onHoverIn={() => setTempRating(i + 1)}
                onHoverOut={() => setTempRating(0)}
              />
            </span>
          )
        )}
      </div>
      {/* Show tempRating (while hovering), otherwise show final rating */}
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}

const startStyle = {
  width: "48px",
  height: "48px",
  display: "block",
  cursor: "pointer",
};

function Star({ onRate, full, onHoverIn, onHoverOut }) {
  return (
    <span
      role="button"
      style={startStyle}
      onClick={onRate}
      onMouseEnter={() => onHoverIn()}
      onMouseLeave={() => onHoverOut()}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#000"
          stroke="#000"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#000"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
```

---

# 119. **Improving Reusability With Props**

---

```js
function Test() {
  const [movieRating, setmMovieRating] = useState(0);
  return (
    <div>
      <StarRating
        color="blue"
        maxRating={10}
        // We pass setMovieRating as the onSetRating prop.
        // This allows the StarRating component to update state in the parent (Test) when a star is clicked.
        // Inside StarRating, calling onSetRating(rating) triggers setMovieRating(rating) here.
        // State name is const [rating, setRating] = useState(defaultRating);

        onSetRating={setmMovieRating}
      />
      <p> This movie was rated {movieRating} stars</p>
    </div>
  );
}
```

---

# 120. **PropTypes**

---

```js
// This is basically BTEC version of TypeScript, won't be used and TypeScript should be better for it.
StartRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};
```

---

# <centre> Section 11. **How React works behind the Scenes**

---

# 124. **Components, Instances, and Elements**

| Term                   | Description                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Component**          | - A blueprint or template for a piece of UI <br> - Defined as a function that returns React elements                                       |
| **Component Instance** | - Created when a component is used/rendered <br> - A real, working copy of the component <br> - Has its own **state** and **props**        |
| **React Element**      | - A plain object returned by `React.createElement()` or JSX <br> - Describes what should appear on screen <br> - Immutable and lightweight |
| **DOM Element**        | - The actual element rendered in the browser <br> - Created from React elements by the React DOM renderer                                  |

---

# 126. **How Rendering Works: Overview**

---

### Render Triggered

Render is triggered when:

- A component mounts (initial render)
- State is updated in one or more component instances (re-render)
- A parent component re-renders

### Render Phase

- React calls component functions
- It figures out how the DOM should be updated (creates a virtual DOM and diffs it)

### Commit Phase

- React writes to the DOM:
  - Updates elements
  - Inserts or deletes elements
- Also runs lifecycle effects like `useEffect`

### Browser Paint

- The browser renders the updated DOM to the screen

---

# 127. **How Rendering Works: The Render Phase**

---

## The Render Phase

- **Initial render**: A virtual DOM is created — a tree of all React elements from all instances in the component tree.
- This process is **cheap and fast**, allowing multiple trees to be created quickly.
- This has **nothing to do with the Shadow DOM**.

![alt text](image-11.png)

### Child Component Rendering

- Rendering a component will also **render all its children**, regardless of whether their props changed or not.

### Why not update the entire DOM when state changes?

- **Answer**: Because writing to the DOM is **relatively slow**.
- In most cases, **only a part of the DOM** needs to be updated.

### How does React avoid unnecessary DOM updates?

- **React reuses as much of the existing DOM as possible**.

#### The process is called **Reconciliation**:

- React determines which DOM elements need to be **inserted**, **updated**, or **deleted**, based on the **latest state changes**.

## The Fiber Architecture

- React builds a special internal structure called the **Fiber Tree**.

![alt text](image-12.png)

### Key points about the Fiber Tree:

- Each **fiber** represents a component instance or a DOM element.
- Fibers are **not recreated on every render**.
- Work can be done **asynchronously**.
- Rendering is split into **chunks** that can be **paused, reused, or thrown away**.
- Enables features like **concurrent rendering** and **suspense**.

## Reconciliation in Action

- When state updates, a new **virtual DOM** is generated.
- React **compares** it to the previous fiber tree.
- Then it **commits** only the necessary changes to the real DOM.

![alt text](image-13.png)

---

# 128. **How Rendering Works: The Commit Phase**

---

1. List of DOM updates > Updated DOM

React writes to the DOM: insertions, deletions, and updates (list of DOM updates are "flushed" to the DOM)
Commiting is synchronous: DOM us updated in one go, it can't be interrupted. This is necessary so that DOM never shows partial results, ensuring a consistent UI (in sync with state at all times).
After the commit phase compleets, the workInProgress fiber tree becomes the current tree for the next render cycle.

![alt text](image-14.png)

## [1] Trigger 🔥

- Rendering is triggered:
  - On the **initial render**
  - When **state or props update**
- Updated React elements are created from component functions.

---

## [2] Render Phase

- React builds a **new Virtual DOM** based on the updated React elements.
- Compares it with the **current Fiber Tree**.
- **Reconciliation + Diffing**:
  - Determines what changed
  - Prepares a list of changes to apply to the real DOM

### Notes:

- The render phase **does not produce any visual output**.
- Rendering a component will also **render all its child components**.
- This phase can be:
  - **Asynchronous** – work can be split, paused, resumed, or prioritized.
  - **Synchronous** – updates written all at once to keep UI consistent.

---

## [3] Commit Phase

- React writes the **DOM updates** to the actual browser DOM.

---

## [4] Browser Paint

- Browser takes the updated DOM and **renders the updated UI** on screen.

![alt text](image-15.png)

---

# 129. **How Diffing Works**

---

---

## What is the `key` Prop?

![alt text](image-16.png)

- A special prop that helps React's diffing algorithm **identify unique elements**.
- Helps React **distinguish** between different instances of the same component type.
- If the `key` **stays the same** across renders:
  - The element will be **preserved** in the DOM, even if its position changes.
- If the `key` **changes**, the element will be **destroyed and recreated**, even if its position stays the same.

---

## 1. Keys in Lists – `[Stable Key]`

![alt text](image-17.png)

### Without Keys:

- Elements are treated as new when the list changes.
- React may re-render or recreate DOM nodes unnecessarily.
- **Bad for performance**.

### With Keys:

- Each item is uniquely identified.
- React reuses elements efficiently.
- Improves **performance** and avoids UI bugs.

🟡 **Always use keys when rendering lists**.

---

## 2. Key Prop to Reset State – `[Changing Key]`

### Problem:

![alt text](image-19.png)

- React preserves component **state** if the element stays in the same position with the same key.

### Solution:

![alt text](image-18.png)

- Change the `key` when you want React to **reset the state** of a component.

✅ Use a **different key** if:

- You want to force React to **recreate** the component.
- You need to **reset local state**, like form inputs.

---

# 134. **Rules for Render Logic: Pure Components**

---

Two types of logic

1: Render Logic-

- Code that lives at the top level of the component function
- Participates in describing how the component view looks like

2: Event Handles Functions

- Executed as a consequence of the event that the handler is listening for (change event in this example)
- Code that actually does things: update state, perform an HTTP request, read an input field, navigate to another page etc.

**Side Effect:** dependency on or modification of any data outside the function scope. Interaction with the outside world. Examples: mutating external variables, HTTP requests, writing to DOM.

```js
const areas = {};

function circleArea(r) {
  areas.circle = 3.14 * r * r;
}
```

**Pure function:** A function that has no side effects.

```js
function circlearea(r) {
  return 3.14 * r * r;
}
```

- Does not change any variables outside its scope.
- Given the same input, a pure function always returns the same output.

☝️ Components must be pure when it comes to render logic: given the same props (input), a component instance should alwas return the same JSC (output).
☝️ Render logic must produce no side effects: no interaction with the "outside world" is allowed. So in Render logic

- Do NOT perform network requests (API calls)
- Do NOT start timers
- Do NOT directly use the DOM API
- Do NOT mutate objects or variables outside of the function scope
- Do NOT update state (or refs): This will create infinite loops

---

# 135. **State Update Batching**

---

```js
const [answer, setAnswer] = useState("");
const [best, setBest] = useState(true);
const [solved, setSolved] = useState(false);

const reset = function () {
  setAnswer("");
  console.log(answer);
  setBest(true);
  setSolved(false);
};
```

![alt text](image-20.png)
![alt text](image-21.png)
![alt text](image-22.png)

---

# 137. **How Events Work in React**

![alt text](image-23.png)

```js
// Select the parent container
const optionsContainer = document.querySelector(".options");

// Attach ONE event listener to the parent
optionsContainer.addEventListener("click", function (e) {
  // Check if the clicked element is a button
  if (e.target.matches(".btn")) {
    console.log(`You clicked: ${e.target.textContent}`);
    e.target.style.backgroundColor = "#ffc107"; // Just a visual feedback
  }
});
```

![alt text](image-24.png)
![alt text](image-25.png)

## 🔹 Synthetic Events in React

- React wraps native DOM events into **SyntheticEvent** for cross-browser consistency.
- Has the **same interface** as native events (e.g., `stopPropagation()`, `preventDefault()`).
- Ensures events work **the same across all browsers**.
- **Most events bubble** like native ones (`focus`, `blur`, `change`), except `scroll`.
- Example: `<input onChange={(e) => setText(e.target.value)} />`

### 🆚 Event Handlers in React vs JS

- Use **camelCase**: `onClick` instead of `onclick` or `click`.
- **Must use `preventDefault()`** to stop default behavior — returning `false` won't work.
- Use `onClickCapture` for **capture phase** instead of bubbling.

---

# 138. **Libraries vs. Frameworks & The React Ecosystem**

---

![alt text](image-26.png)
![alt text](image-27.png)
![alt text](image-28.png)

---

# 139. **Section Summary: Practical Takeaways**

1. A component is like a blueprint for a piece of UI that will eventually exist on the screen. When we "use" a component, React creates a component instance, which is like an actual physical manifestation of a component, containining props, state, and more. A component instance, when rendered, will return a React elemenet.
2. Rendering only means calling component functions and caluclating what DOM elements need to be inserted, deleted, or updated. It has nothing to do with writing to the DOM. Therefore, each time a component instance is rendered and re-rendered, the function is called again.
3. Only the initial app render and state updates can cause a render, which happens for the entire application, not just one single component.
4. When a component instance get re-rendered, all its children will get re-rendered as well. This doesn't mean that all children will get updated in the DOM, thanks to reconciliation, which checks which elements have actually changed between two renders. But all this re-rendering can still have an impact on performance.
5. Diffing is how React decides which DOM elements need to be added or modified. If, between renders, a certain React element stays at the same position in the element tree, the corresponding DOM element and component state will stay the same. If the element changed to a different position, or if it’s a different element type, the DOM element and state will be destroyed and rebuilt.
6. Giving elements a key prop allows React to distinguish between multiple component instances. When a key stays the same across renders, the element is kept in the DOM. This is why we need to use keys in lists. When we change the key between renders, the DOM element will be destroyed and rebuilt. We use this as a trick to reset state.
7. Never declare a new component inside another component! Doing so will re-create the nested component every time the parent component re-renders. React will always see the nested component as new, and therefore reset its state each time the parent state is updated.
8. The logic that produces JSX output for a component instance (“render logic”) is not allowed to produce any side effects: no API calls, no timers, no object or variable mutations, no state updates. Side effects are allowed in event handlers and useEffect (next section 👉).
9. The DOM is updated in the commit phase, but not by React, but by a “renderer” called ReactDOM. That’s why we always need to include both libraries in a React web app project. We can use other renderers to use React on different platforms, for example to build mobile or native apps.
10. Multiple state updates inside an event handler function are batched, so they happen all at once, causing only one re-render. This means we can not access a state variable immediately after updating it: state updates are asynchronous. Since React 18, batching also happens in timeouts, promises, and native event handlers.
11. When using events in event handlers, we get access to a synthetic event object, not the browser’s native object, so that events work the same way across all browsers. The difference is that most synthetic events bubble, including focus, blur, and change, which do not bubble as native browser events. Only the scroll event does not bubble.
12. React is a library, not a framework. This means that you can assemble your application using your favorite third-party libraries. The downside is that you need to find and learn all these additional libraries. No problem, as you will learn about the most commonly used libraries in this course.

---

# Section 12: **Effects and Data Fetching**

---

# 141. **The Component Lifecycle**

---

### Mount/Initial Render

- Component instance is rendered for the first time
- Fresh state and props are created

### Re-Render (optional)

- State changes
- Props change
- Parent re-renders
- Context changes

### Unmount

- Component instance is destroyed and removed
- State and props are destroyed

---

# 142. **How NOT to Fetch Data in React**

---

```js
export default function App() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState(tempMovieData);

  // ❌ BAD: This fetch runs on every render! (infinite loop risk if state updates trigger re-renders)
  fetch(`http://www.omdbapi.com/?apikey=${OMBDAPIKey}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search)); // ❌ Causes re-render, which re-runs fetch again...

  return (
    // JSX output
  );
}

```

---

# 143. **useEffect to the rescue**

---

```js
const [movies, setMovies] = useState([]);
const [watched, setWatched] = useState([]);

// useEffect runs once on initial render (componentDidMount)
useEffect(function () {
  // fetch data from API when component mounts
  fetch(`http://www.omdbapi.com/?apikey=${OMBDAPIKey}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search)); // update state with results
}, []); // empty dependency array = run only once
```

---

# 144. **A First Look at Effects**

---

### Review: A Side effect:

- Basically any interaction between a React component and the world outside the component. We can also think of a side as "code that actually does something". **Examples**: Data fetching, setting up subscriptions, setting up timers, manually accessing the DOM, etc.

Note: Side effects should not be in render logic at all as they are not part of UI.

1. Event Handlers (preferred)

```js
function handleClick() {
  fetch(`website/home`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
}
```

- Executed when the corresponding event happens
- Used to react to an event

2. Effects

```js
useEffect(function () {
  fetch(`website/home`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));

  return () => console.log("Cleanup"); // Cleanup function- This runs when the component unmounts or before the effect re-runs.
}, []); // Dependency array
```

- Executed after the component mounts (initial render), and after subsequent re-renders (according to dependency array)

- Used to keep component synchronised with some external system (in this example, with the API movie data)

---

# 145. **Using an async Function**

---

```js
export default function App() {
const [movies, setMovies] = useState([]);
const [watched, setWatched] = useState([]);

useEffect(function () {
async function fetchMovies() {
const res = await fetch(
`http://www.omdbapi.com/?apikey=${OMBDAPIKey}&s=${query}`
);
const data = await res.json();
setMovies(data.Search);
}
fetchMovies();
}, []);
```

---

# 146. **Adding a Loading State**

---

```js
const [isLoading, setIsLoading] = useState(false);

useEffect(function () {
  async function fetchMovies() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${OMBDAPIKey}&s=${query}`
      );

      if (!res.ok) {
        throw new Error("something went wrong");
      }
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  fetchMovies();
}, []);

<Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>;

function Loader() {
  return (
    <div>
      <p className="loader">Loading...</p>
    </div>
  );
}
```

---

# 147. **Handling Errors**

---

```js
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchMovies() {
      try { //TRY block = run code that might fail (e.g., API call, JSON parsing)
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${OMBDAPIKey}&s=${query}`
        );
        if (!res.ok) throw new Error("something went wrong");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found"); //Response is not universal — it's a custom field used by specific APIs like OMDb, so always check the API's documentation or log the response to see which fields indicate success or error.
        setMovies(data.Search);
      } catch (err) {

        // CATCH block = handle all errors in one place (network issues, logic errors, etc.)
      // Set error state, show message, optionally report/log error
        setError(err.message);
      } finally {
         // FINALLY block = always runs, success or error
      // Ideal for cleanup or resetting loading state
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);


  <Box error={error}>
    {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
    {isLoading && <Loader />}
    {!isLoading && !error && <MovieList movies={movies} />}
    {error && <ErrorMessage message={error} />}
</Box>


function Loader() {
  return (
    <div>
      <p className="loader">Loading...</p>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⭕</span> {message}
    </p>
  );
}
```

---

# 148. **The useEffect Dependency Array**

---

### The dependency Array

- By default. effects run after every render. We can prevent that by passing a dependency array.
- Without dependency array, React doesn't know when to run the effect.
- Each time one of the dependancies changes, the effect will be executed again.
- Every state variable and prop used inside the effect MUST be included in the dependency array.

### UseEffect is a synchronisation mechanism

- useEffect is like an event listener that is listening for one dependency to change. Whenever a dependency changes, it will execute the effect again.

### Synchronisation and lifecycle

- We can use the dependency array to run effects when the component renders or re-renders

```js
useEffect(fn, [x, y, z]); // Effect synchronises with x,y,z > Runs on mount and re-renders by updating x,y,z
useEffect(fn, []); // Effect synchronises with no state/props > Run only on mount (initial render)
useEffect(fn); // Effect synchronises with everything > Runs on every render (Usually bad)
```

### When Are Effects Executed in React?

### Initial Mount (`<MovieDetails />`)

1. **MOUNT** → component is first added to the DOM
2. **COMMIT** → DOM updates are applied
3. **BROWSER PAINT** → screen is updated visually
4. **`useEffect()` runs** ✨ (after paint)

```js
useEffect(() => {
  document.title = `${title} ${userRating && `(Rated ${userRating}) ✨`}`;
}, [title, userRating]);
```

---

# 154. **The useEffect Cleanup Function**

---

## What is the Cleanup Function?

- An optional **function returned** from a `useEffect` hook.
- It runs on **two occasions**:
  1. **Before** the effect runs again (re-run).
  2. **After** the component **unmounts**.

---

## Why Is It Important?

Use the cleanup function to **stop ongoing side effects** that shouldn't persist:

1. **HTTP Requests** → Cancel unfinished requests.
2. **API Subscriptions** → Unsubscribe to prevent memory leaks.
3. **Timers** → Clear intervals or timeouts.
4. **Event Listeners** → Remove them to avoid multiple bindings.

---

## Best Practice

- Each `useEffect` should perform **only one side effect**.
- This makes it easier to **track and clean up** side effects properly.

---

## Example

```jsx
useEffect(() => {
  const intervalID = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(intervalID); // Cleanup
  };
}, []);
```

---

# 155. **Cleaning Up the Title**

---

```js
useEffect(
  function () {
    if (!title) return;
    document.title = `movie ${title}`;

    return function () {
      document.title = "UsePopcorn"; // Clean up
      console.log(`Clean up effect for movie ${title}`); //Closure, meaning title is still old value
    };
  },
  [title]
);
```

---

# 156. **Cleaning Up Data Fetching**

---

```js
useEffect(() => {
  const controller = new AbortController(); // 1. Create controller

  async function fetchMovies() {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${OMBDAPIKey}&s=${query}`,
        { signal: controller.signal } // 2. Attach signal
      );

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      if (data.Response === "False") throw new Error("Movie not found");

      setMovies(data.Search);
    } catch (err) {
      // 3. Ignore AbortError, show real errors
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (query.length < 3) {
    setMovies([]);
    setError("");
    return;
  }

  fetchMovies();

  // 4. Abort fetch if query changes or component unmounts
  return () => {
    controller.abort();
  };
}, [query]);
```

---

# 157. **One More Effect: Listening to a Keypress**

---

```js
useEffect(() => {
  function callback(e) {
    if (e.code === "Escape") {
      onCloseMovie();
    }
  }

  document.addEventListener("keydown", callback);

  return () => {
    document.removeEventListener("keydown", callback);
  };
}, [onCloseMovie]);
```

---

```js
import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const OMBDAPIKey = "1bc700be";
// const tempQuery = "interstellar";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  /* useEffect(function () {
    console.log("After initial render");
  }, []);

  useEffect(function () {
    console.log("After every render");
  });

  useEffect(
    function () {
      console.log("After state updates");
    },
    [query] //
  );
  console.log("During render");
  */

  function handleSelectMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    // 1. Receive the id of the movie to delete
    // 2. Use setWatched to update state
    // 3. Filter out the movie with matching imdbID
    // 4. Return new array without that movie
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${OMBDAPIKey}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box error={error}>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Loader() {
  return (
    <div>
      <p className="loader">Loading...</p>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⭕</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedID, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Release: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${OMBDAPIKey}&i=${selectedID}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedID]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `movie ${title}`;

      return function () {
        document.title = "UsePopcorn"; // Clean up
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={19}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie <span>⭐</span> {watchedUserRating}
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director} </p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
```
