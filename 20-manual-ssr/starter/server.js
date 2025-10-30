const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");
const { renderToString } = require("react-dom/server");
const React = require("react");

const pizzas = [
  {
    name: "Focaccia",
    price: 6,
  },
  {
    name: "Pizza Margherita",
    price: 10,
  },
  {
    name: "Pizza Spinaci",
    price: 12,
  },
  {
    name: "Pizza Funghi",
    price: 12,
  },
  {
    name: "Pizza Prosciutto",
    price: 15,
  },
];

function Home() {
  return (
    <div>
      <h1>🍕 Fast React Pizza Co.</h1>
      <p>This page has been rendered with React on the server 🤯</p>

      <h2>Menu</h2>
      <ul>
        {pizzas.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.name} />
        ))}
      </ul>
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <span>{count}</span>
    </div>
  );
}

function MenuItem({ pizza }) {
  return (
    <li>
      <h4>
        {pizza.name} (${pizza.price})
      </h4>
      <Counter />
    </li>
  );
}

import { createServer } from "http";
import { readFileSync } from "fs";
import { parse } from "url";
import { renderToString } from "react-dom/server";
import Home from "./Home";

/* ============================================================
   1️⃣  Load Static Assets
   ============================================================ 
   - Read the base HTML template and client-side JS file.
   - The HTML file contains a placeholder (%%%CONTENT%%%)
     where the server-rendered React will be injected.
   ============================================================ */
const htmlTemplate = readFileSync(`${__dirname}/index.html`, "utf-8");
const clientJS = readFileSync(`${__dirname}/client.js`, "utf-8");

/* ============================================================
   2️⃣  Create the HTTP Server
   ============================================================ 
   - Handles incoming requests manually (no Express).
   - Parses the request URL to determine which resource to serve.
   ============================================================ */
const server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname;

  /* ============================================================
     Route 1 — Serve the Home Page (Server-Side Rendered)
     ============================================================ 
     1. Render the <Home /> React component on the server using
        renderToString() to generate HTML markup.
     2. Replace the placeholder (%%%CONTENT%%%) in the HTML template
        with the rendered HTML.
     3. Send the final HTML page to the browser.
     ============================================================ */
  if (pathName === "/") {
    const renderedReact = renderToString(<Home />); // Server renders React → HTML
    const html = htmlTemplate.replace("%%%CONTENT%%%", renderedReact);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(html);
  } else if (pathName === "/client.js") {
    /* ============================================================
     Route 2 — Serve the Client-Side JavaScript
     ============================================================ 
     - This JS bundle runs in the browser.
     - It hydrates (attaches) React to the already rendered HTML.
     - Example: hydrateRoot(document.getElementById("root"), <Home />)
     ============================================================ */
    res.writeHead(200, { "Content-type": "application/javascript" });
    res.end(clientJS);
  } else {
    /* ============================================================
     Route 3 — Unknown Path (Fallback)
     ============================================================ 
     - Any other URL returns a simple text response.
     ============================================================ */
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end("The URL cannot be found");
  }
});

/* ============================================================
   3️⃣  Start the Server
   ============================================================ 
   - Listens for incoming requests on port 8000.
   - Visit http://localhost:8000 to see the rendered React app.
   ============================================================ */
server.listen(8000, () => console.log("Listening for requests on port 8000"));
