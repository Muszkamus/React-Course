<!-- markdownlint-disable MD025 -->
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
