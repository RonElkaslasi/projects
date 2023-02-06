const express = require("express");
const User = require("../models/userModel");
const Book = require("../models/bookModel");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/user/new", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.get("/user/token-renewal", auth, async (req, res) => {
//     try {
//       req.user.tokens = req.user.tokens.filter(
//         (tokenDoc) => tokenDoc.token !== req.token
//       );
//       const token = await req.user.generateAuthToken();
//       res.send({ token });
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });
router.get("/user/get-user", auth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
});
router.patch("/user/edit", auth, async (req, res) => {
  const allowEdit = ["name", "email", "password"];

  for (let update in req.body) {
    if (!allowEdit.includes(update)) {
      res.status(400).send({
        status: 400,
        message: "You cannot edit this.",
      });
    }
  }

  try {
    // const user = await User.findOneAndUpdate(req.user, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const user = await User.findOne(req.user);
    for (let update in req.body) {
      user[update] = req.body[update];
    }
    console.log(req.body);

    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/user/delete", auth, async (req, res) => {
  try {
    await req.user.remove();

    res.send();
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/user/login", async (req, res) => {
  const userEmail = req.body.email;
  const userPass = req.body.password;

  try {
    const user = await User.findUserByMailAndPass(userEmail, userPass);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenDoc) => tokenDoc.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/user/addBookToCart", auth, async (req, res) => {
  const name = req.body.name;
  const amount = req.body.amount;

  try {
    const book = await Book.findOne({ name });
    if (!book) {
      return res.status(404).send({
        status: 404,
        message: "book not found",
      });
    }

    await req.user.addToCart(book._id.toString(), amount);
    res.send(req.user.cart);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/user/removeBookFromCart", auth, async (req, res) => {
  const name = req.body.name;
  const user = req.user;

  try {
    const book = await Book.findOne({ name });

    await user.removeFromCart(book._id.toString());
    res.send(user.cart);
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.post("/unregister-user/addBookToCart", async (req,res) => {
//   const name = req.body.name;

//   try{
//     const book = await Book.findOne({name});

//     if(!book)
//     {
//       return status(404).send({

//       })
//     }
//   }
// })

module.exports = router;
