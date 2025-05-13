# CSS FLEXBOX

```js
/* ===========================
   BOX DISPLAY TYPES
=========================== */

/* Block - takes full width */
div { display: block; }

/* Inline - fits content only */
span { display: inline; }

/* Inline-block - inline but can set width/height */
button { display: inline-block; }

/* ===========================
   BOX MODEL
   (controls size and spacing)
=========================== */

div {
  width: 200px;            /* content width */
  height: 100px;           /* content height */
  margin: 10px;            /* space outside */
  padding: 20px;           /* space inside */
  border: 2px solid black; /* border around the box */

  /* ===========================
   POSITIONING
=========================== */
}

.relative-box {
  position: relative;      /* positions relative to normal spot */
  top: 20px;               /* move down 20px */
  left: 10px;              /* move right 10px */
}

/* Other position types:
   - static: default (no positioning)
   - absolute: inside nearest relative parent
   - fixed: sticks to viewport
   - sticky: sticks when scrolling */

/* ===========================
   FLEX CONTAINER SETUP
=========================== */

.container {
  display: flex;               /* enable flexbox */
  flex-direction: row;         /* horizontal (row) or vertical (column) */
  justify-content: center;     /* center along main axis */
  align-items: center;         /* center along cross axis */
  gap: 10px;                   /* space between items */
}

/* ===========================
   FLEX ITEM BEHAVIOR
=========================== */

.item {
  flex: 1;                     /* grow equally to fill space */
  align-self: flex-start;      /* override container alignment */
}

/* ===========================
   TEXT STYLING
=========================== */

h1 {
  color: darkblue;             /* text color */
  font-size: 32px;             /* text size */
  text-align: center;          /* center text horizontally */
  text-transform: uppercase;   /* make text UPPERCASE */
}

<!-- ===========================
     MINIMAL FLEX EXAMPLE
=========================== -->
<div class="container">
  <div class="item">Box 1</div>
  <div class="item">Box 2</div>
</div>

/* Minimal Example Styling */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.item {
  padding: 20px;
  background: lightgray;
}

```

---

## CORE FEATURES

---

✅ align-content only matters when you have multiple rows (i.e. flex-wrap: wrap;)

```js
display: flex;              /* enable flexbox */
flex-direction: row;        /* direction of items (row/column) */
flex-wrap: wrap;            /* allow wrapping to next line */
justify-content: center;    /* align items horizontally */
align-items: center;        /* align items vertically */
align-content: center;      /* align wrapped rows (only with flex-wrap) */

```

```js
🔹 Flex Item (child)

flex-grow: 1; /_ item grows to fill space _/
flex-shrink: 1; /_ item shrinks if needed _/
flex-basis: 200px; /_ base size before grow/shrink _/
flex: 1; /_ shorthand: grow shrink basis _/

align-self: flex-end; /_ override container's align-items _/
order: 2; /_ change item order _/
```

---
