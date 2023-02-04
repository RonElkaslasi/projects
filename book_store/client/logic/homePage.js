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

const joinNewUserButton = document.getElementById("join-button");
const closeAddBookModal = document.getElementById("close-add-book-modal");
const modalAddToCartContainer = document.getElementById(
  "modal-add-to-cart-container"
);
const continueShopButton = document.getElementById("continue-shopping-button");
const hompageBooksUrl = "http://localhost:3000/book/search/";

let skip = 0;
let obj;

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

let i = 1;
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
        const descriptionBook = document.createElement("span");
        const authorBook = document.createElement("h3");
        const addBookButton = document.createElement("button");

        bookContainer.appendChild(divBook);
        divBook.appendChild(imageBook);
        divBook.appendChild(headerBook);
        divBook.appendChild(authorBook);
        // divBook.appendChild(descriptionBook);
        divBook.appendChild(priceBook);
        divBook.appendChild(addBookButton);

        divBook.addEventListener("click", (e) => {
          if (e.target.matches("button")) {
            addBookToCart(divBook);
          } else {
            createModalForBookDetails(
              divBook,
              book.published,
              book.description
            );
          }
        });

        // addBookButton.addEventListener("click", (event) => {
        //   addBookToCart(divBook);
        //   event.stopPropagation();
        // });

        imageBook.src = book.image;
        headerBook.innerText = book.name;
        authorBook.innerText = book.author;
        descriptionBook.innerText = book.description;
        priceBook.innerText = book.price + "₪";
        addBookButton.innerText = "Add to cart";

        divBook.classList.add("book");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const addBookToCart = (divbook) => {
  const url = "http://localhost:3000/user/addBookToCart";
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: divbook.children[1].innerText }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        sumAllTheBooksInCart(data);

        modalAddToCartContainer.classList.remove("none");
        modalAddToCartContainer.classList.add("modal-add-to-cart-container");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addBookToCartForUnregisterUsers(divbook);
  }
};
const addBookToCartForUnregisterUsers = (divbook) => {
  let cart = localStorage.getItem("cart");

  if (!cart) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  cart.push({ name: divbook.children[1].innerText });
  localStorage.setItem("cart", JSON.stringify(cart));
};
const getPriceOfBook = async (bookID) => {
  console.log("book id: " + bookID);
  const url = `http://localhost:3000/book/search/?_id=${bookID}`;

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

const sumAllTheBooksInCart = (cart) => {
  let res = 0;
  let res2 = 0;
  let priceBook;
  const amountItemsInCart = document.getElementById("amount-items-in-cart");
  const totalCost = document.getElementById("total-cost");

  for (let book of cart) {
    getPriceOfBook(book._id).then((books) => {
      if (books[0].price) {
        priceBook = parseInt(books[0].price);
        let amountBook = parseInt(book.amount);
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
  // const modal = document.createElement("div");
  // const nameOfTheBook = document.createElement("h1");
  // const publishedBook = document.createElement("span");
  // const authorBook = document.createElement("span");
  // const descriptionBook = document.createElement("div");

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
});

closeLoginModal.addEventListener("click", () => {
  loginModal.classList.add("none");
});

signInButton.addEventListener("click", () => {
  const signInEmailInput = document.getElementById("signin-email-input");
  const signInPasswordInput = document.getElementById("signin-password-input");

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
      loginSuccess();
      localStorage.setItem("token", user.token);
    })
    .catch((err) => {
      signInEmailInput.placeholder = "*Email incorrect";
      signInEmailInput.classList.add("input");
      signInEmailInput.value = "";
      signInPasswordInput.placeholder = "*Password incorrect";
      signInPasswordInput.classList.add("input");
      signInPasswordInput.value = "";
    });
});
logoutButton.addEventListener("click", () => {
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

      logoutUser();
    })
    .catch((err) => {
      console.log(err);
    });
});

const logoutUser = () => {
  personalDashboard.classList.add("none");
  personalDashboard.classList.remove("fa");
  personalDashboard.classList.remove("fa-user");

  login.classList.remove("none");
  logoutButton.classList.add("none");
  logoutButton.classList.remove("fa");
  logoutButton.classList.remove("fa-sign-out");
};
const loginSuccess = () => {
  loginModal.classList.add("none");
  login.classList.add("none");
  personalDashboard.classList.remove("none");

  personalDashboard.classList.add("fa");
  personalDashboard.classList.add("fa-user");
  logoutButton.classList.remove("none");

  logoutButton.classList.add("fa");
  logoutButton.classList.add("fa-sign-out");
};

const createNewUser = () => {
  const url = "http://localhost:3000/user/new";
  const newUserName = document.getElementById("join-name");
  const newUserEmail = document.getElementById("join-email");
  const newUserPassword = document.getElementById("join-password");

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
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      loginSuccess();
    })
    .catch((err) => {
      newUserEmail.placeholder = "*Somting wrong with the email";
      newUserEmail.classList.add("input");
      newUserEmail.value = "";
      newUserPassword.value = "";
    });
};

renderBooks(hompageBooksUrl);
