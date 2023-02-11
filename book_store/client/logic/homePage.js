const bookContainer = document.getElementById("books-container");
const searchBooksButton = document.getElementById("search-books-button");
const inputSearchBooks = document.getElementById("search-box");
const filterSelect = document.getElementById("sort");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const login = document.getElementById("login");
const loginModal = document.getElementById("login-modal");
const closeLoginModal = document.getElementById("close-login-modal");
const signInButton = document.getElementById("sign-in-button");
const logoutButton = document.getElementById("logout");
const personalDashboard = document.getElementById("personal-dashboard");
const websiteLogo = document.getElementById("image-logo");
const modalContainer = document.createElement("div");
const modal = document.createElement("div");
const nameOfTheBook = document.createElement("h1");
const publishedBook = document.createElement("span");
const authorBook = document.createElement("span");
const descriptionBook = document.createElement("div");
const cartIcon = document.getElementById("cart-icon");
const cartCheckoutButton = document.getElementById("cart-checkout");
const joinNewUserButton = document.getElementById("join-button");
const newUserName = document.getElementById("join-name");
const newUserEmail = document.getElementById("join-email");
const newUserPassword = document.getElementById("join-password");
const closeAddBookModal = document.getElementById("close-add-book-modal");
const modalAddToCartContainer = document.getElementById(
  "modal-add-to-cart-container"
);
const continueShopButton = document.getElementById("continue-shopping-button");
const hompageBooksUrl = "http://localhost:3000/book/search/";

let skip = 0;
let obj;
let currNumsOfBooks = 0;
let i = 1;
let currNumsOfBooks2 = 0;
const renderBooks = (url) => {
  currNumsOfBooks2 = 0;
  while (bookContainer.children.length > 0) {
    bookContainer.removeChild(bookContainer.lastChild);
  }

  if (localStorage.getItem("token")) {
    loginSuccess();
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
      console.log(skip);
      for (let book of jsonObj) {
        currNumsOfBooks++;
        const divBook = document.createElement("div");
        const imageBook = document.createElement("img");
        const headerBook = document.createElement("h3");
        const priceBook = document.createElement("span");
        const descriptionBook = document.createElement("span");
        const authorBook = document.createElement("h3");
        const addBookButton = document.createElement("button");
        const quantityDisplay = document.createElement("span");
        const decreaseQuantityButton = document.createElement("button");
        const increaseQuantityButton = document.createElement("button");
        const quantityContainer = document.createElement("div");
        const plusIcon = document.createElement("i");
        const minusIcon = document.createElement("i");
        plusIcon.classList.add("fa");
        plusIcon.classList.add("fa-plus");
        minusIcon.classList.add("fa");
        minusIcon.classList.add("fa-minus");
        bookContainer.appendChild(divBook);
        divBook.appendChild(imageBook);
        divBook.appendChild(headerBook);
        divBook.appendChild(authorBook);

        divBook.appendChild(priceBook);
        divBook.appendChild(quantityContainer);
        quantityContainer.appendChild(increaseQuantityButton);
        quantityContainer.appendChild(quantityDisplay);
        quantityContainer.appendChild(decreaseQuantityButton);
        decreaseQuantityButton.classList.add("qtyb");
        decreaseQuantityButton.id = "minus-icon";
        increaseQuantityButton.classList.add("qtyb");
        quantityContainer.classList.add("qtyc");
        quantityDisplay.id = "quantity-display";
        quantityDisplay.innerText = 1;
        divBook.appendChild(addBookButton);

        addBookButton.classList.add("add-book-button");

        increaseQuantityButton.appendChild(plusIcon);
        decreaseQuantityButton.appendChild(minusIcon);

        divBook.addEventListener("click", (e) => {
          let quantity = parseInt(quantityDisplay.innerText);
          if (e.target.matches("i")) {
            quantity = quantityDisplay.innerText;
          } else if (e.target.matches("button")) {
            addBookToCart(divBook, quantity);
            quantityDisplay.innerText = "1";
          } else {
            createModalForBookDetails(
              divBook,
              book.published,
              book.description
            );
          }
        });

        decreaseQuantityButton.addEventListener("click", () => {
          let quantity = parseInt(quantityDisplay.innerText);
          if (quantity > 0) {
            quantity -= 1;
          } else {
            quantity = 0;
          }
          quantityDisplay.innerText = quantity;
        });

        increaseQuantityButton.addEventListener("click", () => {
          if (quantityDisplay.innerText === "") {
            quantityDisplay.innerText = "1";
          }
          let quantity = parseInt(quantityDisplay.innerText);

          quantity += 1;
          quantityDisplay.innerText = quantity;
        });

        imageBook.src = book.image;
        headerBook.innerText = book.name;
        authorBook.innerText = book.author;
        descriptionBook.innerText = book.description;
        priceBook.innerText = book.price + "₪";
        addBookButton.innerText = "Add to cart";

        divBook.classList.add("book");
      }
      currNumsOfBooks2 = bookContainer.children.length;
    })
    .catch((err) => {
      console.error(err);
    });
};

const addBookToCart = (divbook, quantity) => {
  const url = "http://localhost:3000/user/addBookToCart";
  const token = localStorage.getItem("token");
  quantity = !quantity ? 1 : quantity;
  if (token) {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: divbook.children[1].innerText,
        amount: quantity,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        sumAllTheBooksInCart(data, quantity);

        modalAddToCartContainer.classList.remove("none");
        modalAddToCartContainer.classList.add("modal-add-to-cart-container");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addBookToCartForUnregisterUsers(divbook, quantity);
    modalAddToCartContainer.classList.remove("none");
    modalAddToCartContainer.classList.add("modal-add-to-cart-container");
  }
};

const addBookToCartForUnregisterUsers = (divbook, quantity) => {
  let cart = localStorage.getItem("cart");
  const amountItemsInCart = document.getElementById("amount-items-in-cart");
  const totalCost = document.getElementById("total-cost");
  let amountbooksInCart = 0;
  let totalPriceOfCart = 0;
  if (!cart) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  cart.push({ name: divbook.children[1].innerText, amount: quantity });
  localStorage.setItem("cart", JSON.stringify(cart));

  for (let book of cart) {
    getPriceOfBook("name", book.name).then((books) => {
      if (books[0].price) {
        priceBook = parseInt(books[0].price);
        let amountBook = book.amount;

        priceBook *= amountBook;
        amountbooksInCart += amountBook;
        totalPriceOfCart += priceBook;
      }
      amountItemsInCart.innerHTML = `You have <b>${amountbooksInCart} books</b> in your cart`;
      totalCost.innerHTML = `Total cost: <span style="color: #37d077; font-weight: bold">${totalPriceOfCart}₪</span>`;
    });
  }
};

const getPriceOfBook = async (filter, bookID) => {
  const url = `http://localhost:3000/book/search/?${filter}=${bookID}`;

  try {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.status);
    }
  } catch (err) {
    console.log(err);
  }

  return res;
};

const sumAllTheBooksInCart = (cart, quantity) => {
  let res = 0;
  let res2 = 0;
  let priceBook;
  const amountItemsInCart = document.getElementById("amount-items-in-cart");
  const totalCost = document.getElementById("total-cost");

  for (let book of cart) {
    getPriceOfBook("_id", book._id).then((books) => {
      if (books[0].price) {
        priceBook = parseInt(books[0].price);
        let amountBook = book.amount;
        priceBook *= amountBook;
        res2 += priceBook;
        res += amountBook;

        amountItemsInCart.innerHTML = `You have <b>${res} books</b> in your cart`;
        totalCost.innerHTML = `Total cost: <span style="color: #37d077; font-weight: bold">${res2}₪</span>`;
      }
    });
  }
};

const createModalForBookDetails = (divbook, published, description) => {
  modalContainer.classList.add("modal-container");
  modalContainer.classList.remove("none");
  modal.classList.remove("none");
  modal.classList.add("modal");
  nameOfTheBook.innerText = divbook.children[1].innerText;
  publishedBook.innerText = "Published: " + published + "\n";
  authorBook.innerText = "Author: " + divbook.children[2].innerText + "\n";
  descriptionBook.innerText = description + "\n";

  document.body.appendChild(modalContainer);
  modalContainer.appendChild(modal);
  modal.appendChild(nameOfTheBook);
  modal.appendChild(authorBook);
  modal.appendChild(publishedBook);
  modal.appendChild(descriptionBook);
};

const logoutUser = () => {
  const logOutUrl = "http://localhost:3000/user/logout";
  const token = localStorage.getItem("token");

  fetch(logOutUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((res) => {
      if (res.ok) {
        if (res.headers.get("Content-Type") === "application/json") {
          return res.json();
        } else {
          console.log("Response is not a JSON");
          return {};
        }
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      localStorage.removeItem("token");

      personalDashboard.classList.add("none");
      personalDashboard.classList.remove("fa");
      personalDashboard.classList.remove("fa-user");

      login.classList.remove("none");
      logoutButton.classList.add("none");
      logoutButton.classList.remove("fa");
      logoutButton.classList.remove("fa-sign-out");
    })
    .catch((err) => {
      console.log(err);
    });
};

const loginSuccess = () => {
  const signInEmailInput = document.getElementById("signin-email-input");
  const signInPasswordInput = document.getElementById("signin-password-input");
  console.log(signInEmailInput.value);
  console.log(signInPasswordInput.value);
  const UserUrl = "http://localhost:3000/user/login";

  fetch(UserUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: signInEmailInput.value,
      password: signInPasswordInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((user) => {
      localStorage.setItem("token", user.token);

      if (localStorage.getItem("cart")) {
        let unregisterUserCart = JSON.parse(localStorage.getItem("cart"));

        for (let book of unregisterUserCart) {
          (async () => {
            let getBookFromDB = await getBook(book);
            let amountOfBooks = book.amount;
            addBookFromLocalStroageToCart(getBookFromDB[0].name, amountOfBooks);
          })();
        }
      }
      localStorage.removeItem("cart");

      loginModal.classList.add("none");
      login.classList.add("none");
      personalDashboard.classList.remove("none");

      personalDashboard.classList.add("fa");
      personalDashboard.classList.add("fa-user");
      logoutButton.classList.remove("none");

      logoutButton.classList.add("fa");
      logoutButton.classList.add("fa-sign-out");
    })
    .catch((err) => {
      signInEmailInput.placeholder = "*Email incorrect";
      signInEmailInput.classList.add("input");
      signInEmailInput.value = "";
      signInPasswordInput.placeholder = "*Password incorrect";
      signInPasswordInput.classList.add("input");
      signInPasswordInput.value = "";
    });

  // loginModal.classList.add("none");
  // login.classList.add("none");
  // personalDashboard.classList.remove("none");

  // personalDashboard.classList.add("fa");
  // personalDashboard.classList.add("fa-user");
  // logoutButton.classList.remove("none");

  // logoutButton.classList.add("fa");
  // logoutButton.classList.add("fa-sign-out");
};

const createNewUser = () => {
  const url = "http://localhost:3000/user/new";
  // const newUserName = document.getElementById("join-name");
  // const newUserEmail = document.getElementById("join-email");
  // const newUserPassword = document.getElementById("join-password");

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newUserName.value,
      email: newUserEmail.value,
      password: newUserPassword.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        // console.log(res);
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.token);

      loginModal.classList.add("none");
      login.classList.add("none");
      personalDashboard.classList.remove("none");
      personalDashboard.classList.add("fa");
      personalDashboard.classList.add("fa-user");
      logoutButton.classList.remove("none");
      logoutButton.classList.add("fa");
      logoutButton.classList.add("fa-sign-out");
      // newUserEmail.value = "";
      // newUserPassword.value = "";
      if (localStorage.getItem("cart")) {
        let unregisterUserCart = JSON.parse(localStorage.getItem("cart"));

        for (let book of unregisterUserCart) {
          (async () => {
            let getBookFromDB = await getBook(book);
            console.log(getBookFromDB);
            console.log(getBookFromDB[0].name);
            let amountOfBooks = book.amount;
            addBookFromLocalStroageToCart(getBookFromDB[0].name, amountOfBooks);
          })();
        }
      }
    })
    .catch((err) => {
      newUserEmail.placeholder = "*Somting wrong with the email";
      newUserEmail.classList.add("input");
      newUserEmail.value = "";
      newUserPassword.value = "";
    });
};

const addBookFromLocalStroageToCart = (getBookFromDB, amountOfBooks) => {
  const url = "http://localhost:3000/user/addBookToCart";
  const token = localStorage.getItem("token");

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: getBookFromDB,
      amount: amountOfBooks,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error(res.status);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBook = async (book) => {
  const bookName = book.name;
  const url = `http://localhost:3000/book/search/?name=${bookName}`;
  let res;
  try {
    res = await fetch(url);
    if (res.ok) {
      res = await res.json();
      return res;
    } else {
      throw new Error(res.status);
    }
  } catch (err) {
    console.log(err);
  }
};

const nextPage = () => {
  const urlGetBooks = "http://localhost:3000/user/get-all-books";
  fetch(urlGetBooks)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((books) => {
      console.log("skip befor: " + skip);
      skip += 4;
      console.log("skip after: " + skip);
      console.log("books len: " + books.length);
      console.log("currNumsOfBooks2: " + currNumsOfBooks2);
      if (skip + 4 >= books.length) {
        nextButton.disabled = true;
        nextButton.classList.add("opacity");
      }

      const url = hompageBooksUrl + `?skip=${skip}`;
      renderBooks(url);
    })
    .catch((err) => {
      console.log(err);
    });
};

//----------------------------------------------------------------Events-------------------------------------------------------//
cartCheckoutButton.addEventListener("click", () => {
  url = "http://localhost:3000/cart";
  window.open(url, "_self");
});
cartIcon.addEventListener("click", () => {
  url = "http://localhost:3000/cart";
  window.open(url, "_self");
});

personalDashboard.addEventListener("click", () => {
  url = "http://localhost:3000/dashboard";
  window.open(url, "_self");
});
websiteLogo.addEventListener("click", () => {
  url = "http://localhost:3000/book/search";
  if (!loginModal.classList.contains("none")) {
    loginModal.classList.add("none");
  }
  renderBooks(url);
});

continueShopButton.addEventListener("click", () => {
  modalAddToCartContainer.classList.add("none");
});
closeAddBookModal.addEventListener("click", () => {
  modalAddToCartContainer.classList.add("none");
});
joinNewUserButton.addEventListener("click", () => {
  createNewUser();
});

prevButton.addEventListener("click", (e) => {
  nextButton.disabled = false;
  nextButton.classList.remove("opacity");
  e.preventDefault();
  skip -= 4;
  if (skip >= 0) {
    const url = hompageBooksUrl + `?skip=${skip}`;
    renderBooks(url);
  } else {
    prevButton.disabled = true;
    prevButton.classList.add("opacity");
    skip = 0;
  }
});

nextButton.addEventListener("click", (e) => {
  prevButton.disabled = false;
  prevButton.classList.remove("opacity");
  e.preventDefault();
  nextPage();
});

searchBooksButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = inputSearchBooks.value;
  console.log(filterSelect.value);
  const url =
    searchValue.length > 0
      ? hompageBooksUrl + `?${filterSelect.value}=` + searchValue
      : hompageBooksUrl;

  renderBooks(url);
});

logoutButton.addEventListener("click", () => {
  logoutUser();
});

modal.addEventListener("click", () => {
  modalContainer.classList.add("none");
  modal.classList.add("none");
});
modalContainer.addEventListener("click", () => {
  modalContainer.classList.add("none");
  modal.classList.add("none");
});
login.addEventListener("click", () => {
  loginModal.classList.add("login-modal");
  loginModal.classList.remove("none");
  newUserEmail.value = "";
  newUserPassword.value = "";
});

closeLoginModal.addEventListener("click", () => {
  loginModal.classList.add("none");
});

signInButton.addEventListener("click", () => {
  loginSuccess();
});

renderBooks(hompageBooksUrl);
