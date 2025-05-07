const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((data) => data.id === id);
}
/*
// ------------- The Array map Method

const books = getBooks();

function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads.reviewsCount;
  const librarything = book.reviews.librarything?.reviewsCount ?? 0; // If anything after question mark is non existent, we swap it with whats after ??
  return goodreads + librarything;
}

const x = [1, 2, 3, 4, 5].map((el) => el * 2);

const titles = books.map((book) => book.title); // map is basically loop, but for objects

const essentialData = books.map((book) => ({
  // Here we can go through the whole object, and pick what we want from the ID which is specific name

  title: book.title, // Name of what we want to print > whatever we want to print
  author: book.author,
  reviewsCount: getTotalReviewCount(book),
}));
essentialData;

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

// ------------ 27. The Array reduce Method

// Acc is cumulator of the value
const pagesAllBooks = books.reduce((sum, book) => sum + book.pages, 0); // Reduce always gives only one value. We need accumulator, and then function

pagesAllBooks;

// ---------- 28. The Array sort Method

// Mutated

const arr = [9, 2, 7, 4, 2];
const sorted = arr.sort((a, b) => a - b); //JS goes through the array, it calls this function, if it is -: Ascending
sorted;
arr; // Sort function mutated original array

// Not mutated

const arr2 = [9, 2, 7, 4, 2];
const sorted2 = arr.slice().sort((a, b) => a - b); //JS goes through the array, it calls this function, if it is -: Ascending
sorted2;
arr2; // Not mutated due to slice function that does nothing, but makes JS not mutate original array

const sortedPages = books.slice().sort((a, b) => a.pages - b.pages);
sortedPages;

/// 29. Working With Immutable Arrays

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
*/

// --------- 30. Asynchronous JavaScript: Promises

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// console.log("Rad");

// 31. Asynchronous JavaScript: Async/Await ( Better)
async function getTodos() {
  // Makes the code asynchronous
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1"); // Fetching API
  const data = await res.json(); // Stores json in the variable
  console.log(data);
}

getTodos();
