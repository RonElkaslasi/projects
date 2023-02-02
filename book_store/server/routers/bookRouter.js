const express = require("express");
const Book = require("../models/bookModel");
const authAdmin = require("../middleware/authAdmin");

const router = new express.Router();

router.post("/book/new", authAdmin, async (req, res) => {
  const book = new Book(req.body);

  try {
    await book.save();
    res.send(book);
  } catch (err) {
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
  const filters = {};

  if (req.query.name) filters.name = req.query.name;
  if (req.query.author) filters.author = req.query.author;
  if (req.query.genre) filters.genre = req.query.genre;
  if (req.query.published) filters.published = req.query.published;
  if (req.query.price) filters.price = req.query.price;

  try {
    const books = await Book.find(filters).skip(skip).limit(limit);

    if (!books) {
      res.status(404).send({
        status: 404,
        message: "No books found.",
      });
    }

    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
