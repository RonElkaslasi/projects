const loginContainer = document.getElementById("login-container");
const loginButton = document.getElementById("login-button");
const newAdminCreateButton = document.getElementById("new-admin-button");
const adminInterface = document.getElementById("admin-interface");
const logoutButton = document.getElementById("logout");
const personalDashboard = document.getElementById("personal-dashboard");
const modalEditAdminContainer = document.getElementById(
  "modal-edit-admin-details-container"
);
const closeModalButton = document.getElementById("close-edit-modal-button");
const editUsernameButton = document.getElementById("change-username-button");
const editEmailButton = document.getElementById("change-email-button");
const editPasswordButton = document.getElementById("change-password-button");
const booksContainer = document.getElementById("books-container");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const editBookModalContainer = document.getElementById(
  "edit-book-modal-container"
);
const editNameBookButton = document.getElementById("change-name-book-button");
const editAuthorBookButton = document.getElementById(
  "change-author-book-button"
);
const editGenreBookButton = document.getElementById("change-genre-book-button");
const editImageBookButton = document.getElementById("change-image-book-button");
const editPublishedBookButton = document.getElementById(
  "change-published-book-button"
);
const editPriceBookButton = document.getElementById("change-price-book-button");
const editDescriptionBookButton = document.getElementById(
  "change-description-book-button"
);
const currBookName = document.getElementById("name-book");
const currBookauthor = document.getElementById("author-book");
const currBookgenre = document.getElementById("genre-book");
const currBookimage = document.getElementById("image-book");
const currBookpublished = document.getElementById("published-book");
const currBookprice = document.getElementById("price-book");
const currBookdescription = document.getElementById("description-book");
const addNewBookButton = document.getElementById("add-new-book");
const addNewBookModalContainer = document.getElementById(
  "add-new-book-container"
);
const addNewBookModalButton = document.getElementById(
  "add-new-book-to-storage"
);
const newAdminUsername = document.getElementById("new-username");
const newAdminEmail = document.getElementById("new-email");
const newAdminPassword = document.getElementById("new-password");

addNewBookModalButton.addEventListener("click", () => {
  addNewBook();
});

const searchBooksButton = document.getElementById("search-books-button");
const inputSearchBooks = document.getElementById("search-box");
const filterSelect = document.getElementById("sort");

searchBooksButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = inputSearchBooks.value;
  console.log(filterSelect.value);
  const url =
    searchValue.length > 0
      ? "http://localhost:3000/book/search/" +
        `?${filterSelect.value}=` +
        searchValue
      : "http://localhost:3000/book/search/";

  renderBooksForAdmin(url);
});

const addNewBook = () => {
  const url = "http://localhost:3000/book/new";
  const token = localStorage.getItem("admin-token");
  const nameNewBook = document.getElementById("name-new-book");
  const authorNewBook = document.getElementById("author-new-book");
  const genreNewBook = document.getElementById("genre-new-book");
  const imageNewBook = document.getElementById("image-new-book");
  const publishedNewBook = document.getElementById("published-new-book");
  const priceNewBook = document.getElementById("price-new-book");
  const descriptionNewBook = document.getElementById("description-new-book");

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameNewBook.value,
      author: authorNewBook.value,
      genre: genreNewBook.value,
      image: imageNewBook.value,
      published: parseInt(publishedNewBook.value),
      description: descriptionNewBook.value,
      price: parseInt(priceNewBook.value),
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((book) => {
      //   console.log(book);
      addNewBookModalContainer.classList.add("none");
      renderBooksForAdmin("http://localhost:3000/book/search");
    })
    .catch((err) => {
      console.log(err);
    });
};

addNewBookModalContainer.addEventListener("click", (e) => {
  if (
    !e.target.matches("input") &&
    !e.target.matches("textarea") &&
    !e.target.matches("button")
  ) {
    addNewBookModalContainer.classList.add("none");
  }
});
addNewBookButton.addEventListener("click", () => {
  addNewBookModalContainer.classList.remove("none");
});
editNameBookButton.addEventListener("click", () => {
  const editNameInput = document.getElementById("edit-name-input");
  if (editNameInput.value !== "") {
    editBook("name", editNameInput, currBookName);
  }
});
editAuthorBookButton.addEventListener("click", () => {
  const editAuthInput = document.getElementById("edit-author-input");
  if (editAuthInput.value !== "") {
    editBook("author", editAuthInput, currBookauthor);
  }
});
editGenreBookButton.addEventListener("click", () => {
  const editgenreInput = document.getElementById("edit-genre-input");
  if (editgenreInput.value !== "") {
    editBook("genre", editgenreInput, currBookgenre);
  }
});

editImageBookButton.addEventListener("click", () => {
  const editImageInput = document.getElementById("edit-image-input");
  if (editImageInput.value !== "") {
    editBook("image", editImageInput, currBookimage);
  }
});
editPublishedBookButton.addEventListener("click", () => {
  const editpublishedInput = document.getElementById("edit-published-input");
  if (editpublishedInput.value !== "") {
    editBook("published", editpublishedInput, currBookpublished);
  }
});
editPriceBookButton.addEventListener("click", () => {
  const editPriceInput = document.getElementById("edit-price-input");
  if (editPriceInput.value !== "") {
    editBook("price", editPriceInput, currBookprice);
  }
});
editDescriptionBookButton.addEventListener("click", () => {
  const editdescriptionInput = document.getElementById(
    "edit-description-input"
  );
  if (editdescriptionInput.value !== "") {
    editBook("description", editdescriptionInput, currBookdescription);
  }
});
const editBook = (filter, dataToEdit, currBookDetail) => {
  const bookName = JSON.parse(localStorage.getItem("bookToEdit")).name;
  const url = `http://localhost:3000/book/edit-book/?name=${bookName}`;
  const token = localStorage.getItem("admin-token");

  fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [filter]: dataToEdit.value,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((book) => {
      currBookDetail.innerText = book[filter];
      dataToEdit.value = "";
    })
    .catch((err) => {
      console.log(err);
      dataToEdit.placeholder = "*Invalid input";
    });
};
editBookModalContainer.addEventListener("click", (e) => {
  if (
    !e.target.matches("button") &&
    !e.target.matches("input") &&
    !e.target.matches("textarea")
  ) {
    editBookModalContainer.classList.add("none");
    localStorage.removeItem("bookToEdit");
  }
});

editUsernameButton.addEventListener("click", () => {
  const inputNewUsername = document.getElementById("edit-new-username");
  const currUsername = document.getElementById("curr-username");
  if (inputNewUsername.value !== "") {
    changeAdminDetails("username", inputNewUsername, currUsername);
  } else {
    inputNewUsername.classList.add("input-incorrect");
    inputNewUsername.placeholder = "*Invalid username";
  }
});
editEmailButton.addEventListener("click", () => {
  const inputNewEmail = document.getElementById("edit-new-email");
  const currEmail = document.getElementById("curr-email");
  if (inputNewEmail.value !== "") {
    changeAdminDetails("email", inputNewEmail, currEmail);
  } else {
    inputNewEmail.classList.add("input-incorrect");
    inputNewEmail.placeholder = "*Invalid email";
  }
});
editPasswordButton.addEventListener("click", () => {
  const inputNewPassword = document.getElementById("edit-new-password");

  if (inputNewPassword.value !== "") {
    changeAdminDetails("password", inputNewPassword);
  } else {
    inputNewPassword.classList.add("input-incorrect");
    inputNewPassword.placeholder = "*Invalid password";
  }
});

closeModalButton.addEventListener("click", () => {
  modalEditAdminContainer.classList.add("none");
  modalEditAdminContainer.classList.remove(
    "modal-edit-admin-details-container"
  );
});
personalDashboard.addEventListener("click", () => {
  const inputNewPassword = document.getElementById("edit-new-password");
  inputNewPassword.value = "";
  modalEditAdminContainer.classList.remove("none");
  modalEditAdminContainer.classList.add("modal-edit-admin-details-container");
});
logoutButton.addEventListener("click", () => {
  logoutAdmin();
});

loginButton.addEventListener("click", () => {
  loginAdmin();
});

newAdminCreateButton.addEventListener("click", () => {
  createNewAdmin();
});

const changeAdminDetails = (filter, newDetail, currDetail) => {
  const url = "http://localhost:3000/admin/edit";
  const token = localStorage.getItem("admin-token");

  fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [filter]: newDetail.value,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((admin) => {
      if (newDetail.id !== "edit-new-password") {
        console.log(admin);
        currDetail.innerText = admin[filter];
      } else {
        alert("Password changed successfully");
        console.log("password changed");
      }
    })
    .catch((err) => {
      newDetail.classList.add("input-incorrect");
      newDetail.placeholder = `*Invalid ${filter}`;
      console.log(err);
    });
};

const logoutAdmin = () => {
  const url = "http://localhost:3000/admin/logout";
  const token = localStorage.getItem("admin-token");

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.ok) {
        if (res.headers.get("Content-Type") === "application/json") {
          return res.json();
        } else {
          console.log("Response is not a JSON");
          return {};
        }
      }
      throw new Error(res.status);
    })
    .then((data) => {
      console.log(data);
      localStorage.removeItem("admin-token");
      loadAdminPage();
    })
    .catch((err) => {
      console.log(err);
    });
};

const loadAdminPage = () => {
  const token = localStorage.getItem("admin-token");
  const url = "http://localhost:3000/book/search";

  if (!token) {
    loginContainer.classList.remove("none");
    loginContainer.classList.add("login-container");
    newAdminUsername.value = "";

    newAdminPassword.value = "";
  } else {
    adminInterface.classList.remove("none");
    adminInterface.classList.add("admin-interface");
    loadAdminDashboard();
    renderBooksForAdmin(url);
  }
};
const loadAdminDashboard = () => {
  const url = "http://localhost:3000/admin/get-admin";
  const token = localStorage.getItem("admin-token");
  const currUserName = document.getElementById("curr-username");
  const currEmail = document.getElementById("curr-email");

  fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((admin) => {
      currUserName.innerText = admin.username;
      currEmail.innerText = admin.email;
    });
};
const createNewAdmin = () => {
  const url = "http://localhost:3000/admin/new";
  // const newAdminUsername = document.getElementById("new-username");
  // const newAdminEmail = document.getElementById("new-email");
  // const newAdminPassword = document.getElementById("new-password");
  const newUsername = newAdminUsername.value;
  const newEmail = newAdminEmail.value;
  const newPassword = newAdminPassword.value;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: newUsername,
      email: newEmail,
      password: newPassword,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((admin) => {
      localStorage.setItem("admin-token", admin.token);
      loginContainer.classList.add("none");
      adminInterface.classList.add("admin-interface");
      justforcheck.classList.remove("none");
    })
    .catch((err) => {
      newAdminUsername.value = "";
      newAdminEmail.value = "";
      newAdminPassword.value = "";

      newAdminUsername.placeholder = "*Invalid username";
      newAdminEmail.placeholder = "*Invalid Email";
      newAdminPassword.placeholder = "*Invalid password";

      newAdminUsername.classList.add("input-incorrect");
      newAdminEmail.classList.add("input-incorrect");
      newAdminPassword.classList.add("input-incorrect");
    });
};

const loginAdmin = () => {
  const url = "http://localhost:3000/admin/login";
  const userNameLogin = document.getElementById("username-login");
  const passwordLogin = document.getElementById("password-login");
  const username = userNameLogin.value;
  const password = passwordLogin.value;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((admin) => {
      localStorage.setItem(
        "admin-token",
        admin.tokens[admin.tokens.length - 1].token
      );
      loginContainer.classList.add("none");
      justforcheck.classList.add("just-for-check");
      justforcheck.classList.remove("none");
    })
    .catch((err) => {
      userNameLogin.value = "";
      passwordLogin.value = "";
      userNameLogin.placeholder = "*Incorrect username";
      passwordLogin.placeholder = "*Incorrect password";
      userNameLogin.classList.add("input-incorrect");
      passwordLogin.classList.add("input-incorrect");
    });
};

let obj;
const renderBooksForAdmin = (url) => {
  while (booksContainer.children.length > 0) {
    booksContainer.removeChild(booksContainer.lastChild);
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
        const editBookButton = document.createElement("button");
        const deleteBook = document.createElement("button");

        booksContainer.appendChild(divBook);
        divBook.appendChild(imageBook);
        divBook.appendChild(headerBook);
        divBook.appendChild(authorBook);
        divBook.appendChild(priceBook);
        divBook.appendChild(editBookButton);
        divBook.appendChild(deleteBook);

        // divBook.addEventListener("click", (e) => {});

        imageBook.src = book.image;
        headerBook.innerText = book.name;
        authorBook.innerText = book.author;
        descriptionBook.innerText = book.description;
        priceBook.innerText = book.price + "₪";
        editBookButton.innerText = "Edit book";
        deleteBook.innerText = "Delete book";

        divBook.classList.add("book");
        editBookButton.classList.add("add-book-button");
        deleteBook.classList.add("add-book-button");
        deleteBook.id = "delete-book";

        editBookButton.addEventListener("click", () => {
          editBookModalContainer.classList.remove("none");
          localStorage.setItem("bookToEdit", JSON.stringify(book));
          loadbookEdit();
        });

        deleteBook.addEventListener("click", () => {
          localStorage.setItem("bookToDelete", JSON.stringify(book));
          deleteBookFromStorage();
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// const currBookName = document.getElementById("name-book");
// const currBookauthor = document.getElementById("author-book");
// const currBookgenre = document.getElementById("genre-book");
// const currBookimage = document.getElementById("image-book");
// const currBookpublished = document.getElementById("published-book");
// const currBookprice = document.getElementById("price-book");
// const currBookdescription = document.getElementById("description-book");
const deleteBookFromStorage = () => {
  const bookId = JSON.parse(localStorage.getItem("bookToDelete"))._id;
  const token = localStorage.getItem("admin-token");
  const url = "http://localhost:3000/book/remove-book";
  console.log(bookId);
  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: bookId,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((book) => {
      renderBooksForAdmin("http://localhost:3000/book/search/");
      localStorage.removeItem("bookToDelete");
    })
    .catch((err) => {
      console.log(err);
    });
};

const loadbookEdit = () => {
  const book = JSON.parse(localStorage.getItem("bookToEdit"));
  currBookName.innerText = book.name;
  currBookauthor.innerText = book.author;
  currBookgenre.innerText = book.genre;
  currBookpublished.innerText = book.published;
  currBookprice.innerText = book.price;
  currBookdescription.innerText = book.description;
};
let skip = 0;
// const editBook = (book) => {
//     const
//   const bookName = book.name;
// };
// nextButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   skip += 4;

//   console.log(obj);
//   if (obj.length === 2) {
//     skip = 0;
//   }
//   const url = `http://localhost:3000/book/search/?skip=${skip}`;

//   renderBooksForAdmin(url);
// });

// prevButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   skip -= 4;
//   const url =
//     skip >= 0
//       ? `http://localhost:3000/book/search/?skip=${skip}`
//       : `http://localhost:3000/book/search/`;
//   skip = skip < 0 ? 0 : skip;

//   renderBooksForAdmin(url);
// });

prevButton.addEventListener("click", (e) => {
  nextButton.disabled = false;
  nextButton.classList.remove("opacity");
  e.preventDefault();
  skip -= 4;
  if (skip >= 0) {
    const url = "http://localhost:3000/book/search/" + `?skip=${skip}`;
    renderBooksForAdmin(url);
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

const nextPage = () => {
  const urlGetBooks = "http://localhost:3000/user/get-all-books";
  fetch(urlGetBooks)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((books) => {
      // console.log("skip befor: " + skip);
      skip += 4;
      console.log("skip after: " + skip);
      console.log("books len: " + books.length);
      // console.log("currNumsOfBooks2: " + currNumsOfBooks2);
      if (skip + 4 >= books.length) {
        nextButton.disabled = true;
        nextButton.classList.add("opacity");
      }

      const url = "http://localhost:3000/book/search/" + `?skip=${skip}`;
      renderBooksForAdmin(url);
    })
    .catch((err) => {
      console.log(err);
    });
};

loadAdminPage();
