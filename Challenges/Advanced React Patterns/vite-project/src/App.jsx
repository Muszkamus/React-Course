import { useState } from "react";
import { faker } from "@faker-js/faker";
import withToggles from "./HOC";

/* ------------------------------------------------------------
   Generate fake data for demonstration using Faker.js
   ------------------------------------------------------------ */
const products = Array.from({ length: 20 }, () => ({
  productName: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
}));

const companies = Array.from({ length: 15 }, () => ({
  companyName: faker.company.name(),
  phrase: faker.company.catchPhrase(),
}));

/* ------------------------------------------------------------
   Product item — presentation-only component
   ------------------------------------------------------------ */
function ProductItem({ product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  );
}

/* ------------------------------------------------------------
   Company item — presentation-only component with hover state
   ------------------------------------------------------------ */
function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisisble] = useState(defaultVisibility);

  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisisble(true)}
      onMouseLeave={() => setIsVisisble(false)}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

/* ============================================================
   REUSABLE LIST — Render Props Pattern
   ============================================================

   🧠 Concept:
   This List component accepts a `render` prop — a *function* that
   tells the List how to display each item.

   The List itself controls list-wide behavior (open/collapse)
   but delegates the *content rendering* to the parent.

   ✅ Advantages:
   - Makes List reusable for *any data structure*.
   - The parent component decides what each item looks like.
   ============================================================ */
function List({ title, items, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(false);
  }

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>

      {/* render(item) — function provided by parent determines rendering */}
      {isOpen && <ul className="list">{displayItems.map(render)}</ul>}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------
   ProductList — fixed list (non-reusable version)
   ------------------------------------------------------------ */
function ProductList({ title, items }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}

/* ============================================================
   HOC Version — Adding Behavior via Composition
   ============================================================

   🧩 The withToggles() Higher-Order Component wraps ProductList
   and injects toggle functionality (open/collapse behavior)
   *without modifying ProductList itself*.

   This achieves a similar outcome to the render-prop version,
   but with a different philosophy:
   - Render Props → parent provides render logic.
   - HOC → wrapper provides new behavior.
   ============================================================ */
const ProductListWithToggles = withToggles(ProductList);

/* ============================================================
   MAIN APP COMPONENT
   ============================================================

   We demonstrate both approaches:
   - The commented-out section uses Render Props.
   - The live section uses an HOC-enhanced list.
   ============================================================ */
export default function App() {
  return (
    <div>
      <h1>Render Props & HOC Demo</h1>

      {/* 
      ------------------- Render Props Example -------------------
      <div className="col-2">
        <List
          title="Products"
          items={products}
          render={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />
        <List
          title="Companies"
          items={companies}
          render={(company) => (
            <CompanyItem
              key={company.companyName}
              company={company}
              defaultVisibility={false}
            />
          )}
        />
      </div>
      ------------------------------------------------------------
      */}

      {/* ------------------- HOC Example ------------------- */}
      <div className="col-2">
        <ProductList title="Products (Base)" items={products} />
        <ProductListWithToggles title="Products (With HOC)" items={products} />
      </div>
    </div>
  );
}

/* ============================================================
   Summary Comparison
   ============================================================

   ⚙️ Render Props Pattern:
     - List defines generic structure and passes rendering control
       to parent through `render` prop.
     - Great for flexible display logic.
     - Slightly more verbose in JSX usage.

   ⚙️ Higher-Order Component (HOC) Pattern:
     - Wraps a component and enhances it with extra functionality.
     - The wrapped component doesn’t know about the new logic.
     - Great for reusing behavior across many components.

   Both patterns demonstrate the *React composition principle*:
   - Separate logic from presentation.
   - Reuse code without repetition.
   ============================================================ */
