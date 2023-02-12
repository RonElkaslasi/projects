const express = require("express");
const Book = require("../models/bookModel");
const authAdmin = require("../middleware/authAdmin");

const router = new express.Router();

router.post("/book/new", authAdmin, async (req, res) => {
  const book = new Book(req.body);
  console.log(book);
  try {
    await book.save();
    res.send(book);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
});

router.delete("/book/remove-book", authAdmin, async (req, res) => {
  const _id = req.body._id;

  try {
    const book = await Book.findByIdAndDelete({ _id });
    if (!book) {
      res.status(404).send({
        status: 404,
        message: "book not found",
      });
    }
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/book/get-all", authAdmin, async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      res.status(404).send({
        status: 404,
        message: "not found any book.",
      });
    }
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/book/edit-book", authAdmin, async (req, res) => {
  const name = req.query.name;
  console.log(name);
  const allowToEdit = [
    "name",
    "author",
    "genre",
    "image",
    "published",
    "description",
    "price",
  ];

  for (let update in req.body) {
    if (!allowToEdit.includes(update)) {
      res.status(400).send({
        status: 400,
        message: "You cannot edit that.",
      });
    }
  }

  try {
    const book = await Book.findOneAndUpdate({ name }, req.body, {
      new: true,
      runValidators: true,
    });

    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/book/search", async (req, res) => {
  const limit = req.query.limit || 4;
  const skip = req.query.skip || 0;
  let filters = {};
  const result = [];
  console.log(req.query._id);
  if (req.query.name) filters.name = req.query.name.toLowerCase();
  if (req.query.author) filters.author = req.query.author.toLowerCase();
  if (req.query.genre) filters.genre = req.query.genre.toLowerCase();
  if (req.query.published) filters.published = req.query.published;
  if (req.query.price) filters.price = req.query.price;
  if (req.query._id) filters._id = req.query._id;
  console.log(filters._id);

  if (Object.keys(filters).length === 0) {
    if (req.query.filter) filters.filter = req.query.filter;
  }
  try {
    let books = await Book.find({});
    if (!books) {
      return res.status(404).send({
        status: 404,
        message: "No books found.",
      });
    }

    if (filters.name) {
      books.forEach((book) => {
        if (book.name.toLowerCase().includes(filters.name)) {
          result.push(book);
        }
      });
    } else if (filters.author) {
      books.forEach((book) => {
        if (book.author.toLowerCase().includes(filters.author)) {
          result.push(book);
        }
      });
    } else if (filters.published) {
      books.forEach((book) => {
        if (book.published.equals(filters.published)) {
          result.push(book);
        }
      });
    } else if (filters.price) {
      books.forEach((book) => {
        if (book.price.includes(filters.price)) {
          result.push(book);
        }
      });
    } else if (filters._id) {
      books.forEach((book) => {
        if (book._id.equals(filters._id)) {
          result.push(book);
        }
      });
    } else if (filters.filter) {
      books.forEach((book) => {
        if (
          book.name.toLowerCase().includes(req.query.filter.toLowerCase()) ||
          book.author.toLowerCase().includes(req.query.filter.toLowerCase())
        ) {
          result.push(book);
        }
      });
    }

    if (result.length === 0) {
      books = await Book.find({}).skip(skip).limit(limit);
      res.send(books);
    } else {
      // res.send(result.slice(skip, skip + limit));
      res.send(result);
    }
  } catch (err) {
    res.status(500).send(res);
  }
});
module.exports = router;
