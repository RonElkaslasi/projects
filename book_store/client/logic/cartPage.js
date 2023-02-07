const headerLogoContainer = document.getElementById("logo");
const emptyCartContainer = document.getElementById("empty-cart-container");
const SignInButton = document.getElementById("login");
const homeIcon = document.getElementById("home-icon");
const logoutButton = document.getElementById("logout");
const personalDashboard = document.getElementById("personal-dashboard");

logoutButton.addEventListener("click", () => {
  logoutUser();
  localStorage.removeItem("token");
  personalDashboard.classList.remove("fa");
  personalDashboard.classList.remove("fa-user");
  logoutButton.classList.remove("fa");
  logoutButton.classList.remove("fa-sign-out");
});
personalDashboard.addEventListener("click", () => {
  const url = "http://localhost:3000/dashboard";
  window.open(url, "_self");
});
homeIcon.addEventListener("click", () => {
  const url = "http://localhost:3000";
  window.open(url, "_self");
});
headerLogoContainer.addEventListener("click", () => {
  const url = "http://localhost:3000";
  window.open(url, "_self");
});

const loadCartInterface = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    cartUnragisterUser();
  } else {
    cartRegisterUser();
    personalDashboard.classList.add("fa");
    personalDashboard.classList.add("fa-user");
    logoutButton.classList.add("fa");
    logoutButton.classList.add("fa-sign-out");
  }
};

const getUserCart = () => {
  const url = "http://localhost:3000/user/get-user";
  const token = localStorage.getItem("token");

  return fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .catch((err) => {
      console.log(err);
    });
};
const cartRegisterUser = () => {
  getUserCart().then((userObj) => {
    const cart = userObj.cart;
    if (cart.length === 0) {
      displayEmptyCart();
    } else {
      for (let book of cart) {
        getBook("_id", book._id).then((bookObj) => {
          createBooksToDisplay(bookObj, book.amount);
        });
      }
    }
  });
};
const displayEmptyCart = () => {
  const checkoutButton = document.getElementById("checkout-button");
  emptyCartContainer.classList.remove("none");
  checkoutButton.style.backgroundColor = "#808080";
  checkoutButton.style.opacity = "1";
};

const cartUnragisterUser = () => {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    displayEmptyCart();
  } else {
    let unregisterUserCart = JSON.parse(localStorage.getItem("cart"));

    for (let book of unregisterUserCart) {
      console.log(book.name);
      getBook("name", book.name).then((bookObj) => {
        createBooksToDisplay(bookObj, book.amount);
      });
    }
  }
};

const getBook = (filter, book) => {
  const url = `http://localhost:3000/book/search?${filter}=${book}`;

  return fetch(url)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .catch((err) => {
      console.log(err);
    });
};
const createBooksToDisplay = (book, amount) => {
  const itemCartContainer = document.getElementById("item-cart-container");
  const bookName = document.createElement("h1");
  const booksContainer = document.getElementById("books-container");
  const divBook = document.createElement("div");
  const imgAndPriceContainer = document.createElement("div");
  const imgBook = document.createElement("img");
  const spanPrice = document.createElement("span");
  const quantityContainer = document.createElement("div");
  const quantityButtonsContainer = document.createElement("div");
  const increaseButton = document.createElement("button");
  const plusIcon = document.createElement("i");
  const quantityDisplay = document.createElement("span");
  const decreaseButton = document.createElement("button");
  const minusIcon = document.createElement("i");
  const removeIcon = document.createElement("i");
  const totalPrice = document.getElementById("total-parice");

  booksContainer.appendChild(divBook);
  imgAndPriceContainer.appendChild(bookName);
  divBook.appendChild(imgAndPriceContainer);
  imgAndPriceContainer.appendChild(imgBook);
  imgAndPriceContainer.appendChild(spanPrice);
  divBook.appendChild(quantityContainer);

  quantityContainer.appendChild(quantityButtonsContainer);
  quantityButtonsContainer.appendChild(increaseButton);
  increaseButton.appendChild(plusIcon);
  quantityButtonsContainer.appendChild(quantityDisplay);
  quantityButtonsContainer.appendChild(decreaseButton);
  decreaseButton.appendChild(minusIcon);
  quantityContainer.appendChild(removeIcon);

  divBook.classList.add("book");

  imgAndPriceContainer.classList.add("img-price-container");
  spanPrice.classList.add("price");
  quantityContainer.classList.add("quantity-container");
  quantityButtonsContainer.classList.add("quantity");
  plusIcon.classList.add("fa");
  plusIcon.classList.add("fa-plus");
  minusIcon.classList.add("fa");
  minusIcon.classList.add("fa-minus");
  quantityDisplay.classList.add("quantity-display");
  removeIcon.classList.add("remove-button");
  removeIcon.classList.add("fa");
  removeIcon.classList.add("fa-trash");
  bookName.classList.add("book-name");

  bookName.innerText = book[0].name;
  imgBook.src = book[0].image;
  spanPrice.innerText = book[0].price * amount + "₪";
  quantityDisplay.innerText = amount;
  if (totalPrice.innerText === "") {
    totalPrice.innerText = 0;
  }

  totalPrice.innerText =
    parseInt(totalPrice.innerText) + book[0].price * amount + "₪";

  increaseButton.addEventListener("click", () => {
    increaseAmountBook(book[0].name, quantityDisplay);
    spanPrice.innerText = book[0].price * (amount + 1) + "₪";
    totalPrice.innerText = parseInt(totalPrice.innerText) + book[0].price + "₪";
    amount += 1;
  });

  decreaseButton.addEventListener("click", () => {
    decreaseAmountBook(book[0].name, quantityDisplay);
    if (parseInt(totalPrice.innerText) === 0) totalPrice.innerText = 0 + "₪";
    else {
      if (parseInt(spanPrice.innerText) === 0)
        totalPrice.innerText = parseInt(totalPrice.innerText) - 0 + "₪";
      else
        totalPrice.innerText =
          parseInt(totalPrice.innerText) - book[0].price + "₪";
    }

    if (parseInt(spanPrice.innerText) === 0) {
      spanPrice.innerText = 0 + "₪";
    } else {
      spanPrice.innerText = book[0].price * (amount - 1) + "₪";
      amount -= 1;
    }
  });

  removeIcon.addEventListener("click", () => {
    romveBookFromCart(book[0].name, divBook, booksContainer);
    totalPrice.innerText =
      parseInt(totalPrice.innerText) - parseInt(spanPrice.innerText) + "₪";

    if (booksContainer.children.length === 0) {
      displayEmptyCart();
    }
  });
};

const romveBookFromCart = (bookName, divBook, booksContainer) => {
  const token = localStorage.getItem("token");

  if (!token) {
    let unregisterUserCart = JSON.parse(localStorage.getItem("cart"));
    let newUnregisterUserCart = [];
    for (let i = 0; i < unregisterUserCart.length; i++) {
      if (unregisterUserCart[i].name !== bookName) {
        const book = {
          name: unregisterUserCart[i].name,
          amount: unregisterUserCart[i].amount,
        };
        newUnregisterUserCart.push(book);
      }
    }
    localStorage.setItem("cart", JSON.stringify(newUnregisterUserCart));
    booksContainer.removeChild(divBook);
    if (booksContainer.children.length === 0) {
      localStorage.removeItem("cart");
    }
  } else {
    let amount = 0;
    const url = "http://localhost:3000/user/removeBookFromCartAll";
    getUserCart()
      .then((userObj) => {
        getBook("name", bookName)
          .then((book) => {
            for (bookInCart of userObj.cart) {
              if (bookInCart._id === book[0]._id) {
                amount = bookInCart.amount;
              }
            }
            fetch(url, {
              method: "DELETE",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: bookName,
              }),
            })
              .then((res) => {
                if (res.ok) return res.json();
                throw new Error(res.status);
              })
              .then((cart) => {
                booksContainer.removeChild(divBook);
                if (booksContainer.children.length === 0) {
                  displayEmptyCart();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const decreaseAmountBook = (bookName, display) => {
  if (!localStorage.getItem("token")) {
    let unregisterUserCart = JSON.parse(localStorage.getItem("cart"));
    unregisterUserCart = unregisterUserCart.map((book) =>
      book.name === bookName
        ? { name: book.name, amount: book.amount - 1 < 0 ? 0 : book.amount - 1 }
        : { name: book.name, amount: book.amount }
    );
    // if()
    localStorage.setItem("cart", JSON.stringify(unregisterUserCart));
    display.innerText =
      parseInt(display.innerText) - 1 < 0 ? 0 : parseInt(display.innerText) - 1;
  } else {
    const url = "http://localhost:3000/user/removeBookFromCart";
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bookName,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.status);
      })
      .then((cart) => {
        display.innerText = parseInt(display.innerText) - 1;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const increaseAmountBook = (bookName, display) => {
  if (!localStorage.getItem("token")) {
    let unregisterUserCart = JSON.parse(localStorage.getItem("cart"));

    unregisterUserCart = unregisterUserCart.map((book) =>
      book.name === bookName
        ? { name: book.name, amount: book.amount + 1 }
        : book
    );
    localStorage.setItem("cart", JSON.stringify(unregisterUserCart));
    display.innerText = parseInt(display.innerText) + 1;
  } else {
    const url = "http://localhost:3000/user/addBookToCart";
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bookName,
        amount: 1,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.status);
      })
      .then((cart) => {
        display.innerText = parseInt(display.innerText) + 1;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const logoutUser = () => {
  const url = "http://localhost:3000/user/logout";
  const token = localStorage.getItem("token");

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error(res.status);
    })
    .catch((err) => {
      console.log(err);
    });
};
loadCartInterface();
