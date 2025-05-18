# <centre> Section 12: Numbers, Dates Intl and Timers

---

# 181. **Converting and Checking Numbers**

---

```js
console.log(23 === 23.0); // True
// Base 10 = 0 to 9
// Binary base 2 = 0-1
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
// Due to that, doing maths in JS is not good idea

console.log(Number("23")); // Converts to integer
console.log(+"23"); // Type coercion > Changing into a number

// Parsing
console.log(Number.parseInt("30px")); //30
console.log(Number.parseInt("e23")); // NAN

console.log(Number.parseInt("2.5rem")); // 2
console.log(Number.parseFloat("2.5rem")); // 2.5

// Checks if its not a number
console.log(Number.isNaN(20)); // False
console.log(Number.isNaN("20")); // False

// However, this is better. Checking if value is a number
console.log(Number.isFinite(20)); //True
console.log(Number.isFinite("20")); // False
```

---

# 182. **Math and Rounding**

---

```js
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5

console.log(Math.max(5, 8, "23", 11, 2)); // 23, 23px will not work
console.log(Math.min(1, 6, 4, 9, 2));

console.log(Math.PI * Number.parseFloat("10px") ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

console.log(randomInt(10, 20));
console.log(randomInt(0, 3));

// rounding integers
console.log(Math.trunc(23.9)); // 23 // rounds down
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.1)); // 24 // rounds up
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.9)); // 23
console.log(Math.trunc(23.9)); // 23

// However, floor is better to use overall
console.log(Math.floor(-23.9)); // -24
console.log(Math.trunc(-23.9)); // -23

// Rounding decimals
console.log((2.7).toFixed(0)); // 3
console.log((2.345).toFixed(2)); // 2.35
console.log(+(2.345).toFixed(2)); // 2.35 As these are strings, + before number turns it into number
```

---

# 183. **The remainder operator**

```js
console.log(5 % 2); // 1 // Basically, it divides, and shows us the remainder of the numbers after dividing
console.log(5 / 2); // 2.5, But > = 2 \* 2 + (1)

const isEven = n => n % 2 === 0;
console.log(isEven(2));
// How it can be done in loop,
if (i%2 === 0) // Do something every 2nd time in a loop

if (i%3 === 0) // Do something every 3rd time in a loop
```

---

# 185. **Working with BigInt**

---

```js
const diameter = 287_232_000_000;
console.log(diameter); // 287232000000

console.log(2 \*\* 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
// Anything above can give wrong calculations

console.log(35234523452345234553452345n); // Add n at the end to store big massive numbers
console.log(BigInt(32948572938475932847592832));

// Operations
console.log(10000n + 10000n); // Only bigInt with bitInt
// console.log(10000n + 10000); // Error

// Exceptions
console.log(20n > 15); // True
console.log(20n === 20); // false
console.log(20n == '20'); // True
```

---

# 186. **Create Date**

```js
// Create date
const now = new Date();
console.log(now); // Sat May 17 2025 16:54:45 GMT+0100 (British Summer Time)
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 25, 14, 24, 12)); // month is usually 0

console.log(new Date(2037, 10, 33)); // Thu Dec 03 2037 00:00:00 GMT+0000 (Greenwich Mean Time)
console.log(new Date(0)); // Thu Jan 01 1970 01:00:00 GMT+0100 (Greenwich Mean Time)
console.log(new Date(3 _ 24 _ 60 _ 60 _ 1000)); // Adds 3 days from the above one

//Working with future

console.log('---------');
const future = new Date(2025, 10, 19, 15, 36, 33);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());

console.log(future.toISOString()); // 2025-11-19T15:36:33.000Z
console.log(future.toDateString()); // Wed Nov 19 2025
console.log(future.getTime()); // 1763566593000
console.log(new Date(1763566593000)); // Wed Nov 19 2025 15:36:33 GMT+0000 (Greenwich Mean Time)

console.log(Date.now()); // 1747498944237

future.setFullYear(2040); // Change the year
```

---

# 189. **Operations With Dates**

---

```js
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future); // Changes is it into numerical

const calcDaysPassed = (date1, date2) =>
  // This will not do negative number
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // Milliseconds, seconds, minutes, hours (Prints days)

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));

console.log(days1); // Shows 10 days difference
// Useful if e.g. it is 1, we can say it's tomorrow or yesterday depending on the positive/negative
```

---

# 190. **Internationalising Numbers**

---

```js
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
};
labelDate.textContent = new Intl.DateTimeFormat("en-GB", options).format(now); // ISO language code

// const locale = navigator.language // This will check browser language, can be used above
// For more info check "mdn Intl"
```
