const bookContainer = document.getElementById("books-container");
const searchBooksButton = document.getElementById("search-books-button");
const inputSearchBooks = document.getElementById("search-box");
const filterSelect = document.getElementById("sort");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const hompageBooksUrl = "http://localhost:3000/book/search/";
let skip = 0;
let obj;

prevButton.addEventListener("click", (e) => {
  e.preventDefault();
  skip -= 4;
  const url = skip >= 0 ? hompageBooksUrl + `?skip=${skip}` : hompageBooksUrl;
  skip = skip < 0 ? 0 : skip;

  renderBooks(url);
});

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  skip += 4;

  console.log(obj);
  if (obj.length === 2) {
    skip = 0;
  }
  const url = hompageBooksUrl + `?skip=${skip}`;

  renderBooks(url);
});

searchBooksButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = inputSearchBooks.value;
  const url =
    searchValue.length > 0
      ? hompageBooksUrl + `?${filterSelect.value}=` + searchValue
      : hompageBooksUrl;

  renderBooks(url);
});

const renderBooks = (url) => {
  while (bookContainer.children.length > 0) {
    bookContainer.removeChild(bookContainer.lastChild);
  }

  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((jsonObj) => {
      obj = jsonObj;
      for (let book of jsonObj) {
        const divBook = document.createElement("div");
        const imageBook = document.createElement("img");
        const headerBook = document.createElement("h3");
        const priceBook = document.createElement("span");
        const addBookButton = document.createElement("button");

        bookContainer.appendChild(divBook);
        divBook.appendChild(imageBook);
        divBook.appendChild(headerBook);
        divBook.appendChild(priceBook);
        divBook.appendChild(addBookButton);

        imageBook.src = book.image;
        headerBook.innerText = book.name;
        priceBook.innerText = book.price + "₪";
        addBookButton.innerText = "Add to cart";

        divBook.classList.add("book");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

renderBooks(hompageBooksUrl);
