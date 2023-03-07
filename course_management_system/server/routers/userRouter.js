const express = require("express");
const userAuth = require("../middleware/userAuth");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const bcrypt = require("bcryptjs");

const router = new express.Router();

router.post("/user", async (req, res) => {
  const userExist = await User.find({ email: req.body.email });
  if (userExist.email) {
    return res.status(400).send({
      status: 400,
      message: "Email already exsist",
    });
  }
  const user = new User(req.body);

  try {
    if (user.roll !== "student") {
      const token = await user.generateAuthToken();
      return res.send({ user, token });
    }

    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/user", userAuth, async (req, res) => {
  const id = req.query._id;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "user not found.",
      });
    }

    await user.save();
    res.send(user);
  } catch (err) {
    res.status(401).send(err.meesage);
  }
});

router.get("/personal-data", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  try {
    const user = await User.findUserByMailAndPass(userEmail, userPassword);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/logout", userAuth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenDoc) => tokenDoc.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(401).send(err);
  }
});

router.patch("/personal-details", userAuth, async (req, res) => {
  const allowEdit = ["name", "birth", "address", "email", "password"];

  for (let updateData in req.body) {
    if (!allowEdit.includes(updateData)) {
      res.status(400).send({
        status: 400,
        message: "You cannot edit this.",
      });
    }
  }

  try {
    const user = await User.findOne(req.user);
    const token = user.tokens[user.tokens.length - 1].token;

    for (let updateData in req.body) {
      user[updateData] = req.body[updateData];
    }

    await user.save();
    res.send({ user, token });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.patch("/change-password", userAuth, async (req, res) => {
  // const { currentPassword, newPassword } = req.body;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  try {
    const user = await User.findOne(req.user);
    const token = user.tokens[user.tokens.length - 1].token;
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch)
      return res.status(400).send({
        status: 400,
        message: "Incorrect current password",
      });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/my-courses", userAuth, async (req, res) => {
  const user = req.user;

  try {
    if (user.courses.length === 0) {
      res.status(404).send({
        status: 404,
        message: "not courses found.",
      });
    }

    res.send(user.courses);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

// router.get("/courses", userAuth, async (req, res) => {
//   try {
//     const courses = await Course.find({})

//     if (courses.length === 0) {
//       return res.status(404).send({
//         status: 404,
//         message: "Not found courses",
//       });
//     }

//     res.send(courses);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

router.post("/add-user-to-class", userAuth, async (req, res) => {
  const userId = req.body.userId;
  const courseId = req.body.courseId;

  try {
    const user = await User.findById(userId).populate("courses");
    const course = await Course.findById(courseId)
      .populate("registers")
      .populate("professor");

    if (!user || !course) {
      return res.status(404).send({
        status: 404,
        message: "not found.",
      });
    }

    if (user.roll === "student") course.registers.push(user);
    else if (user.roll === "professor") course.professor = user;

    user.courses.push(course);

    await user.save();
    await course.save();

    res.send({ user, course });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post("/delete-user-from-class", userAuth, async (req, res) => {
  const userId = req.body.userId;
  const courseId = req.body.courseId;

  try {
    const user = await User.findById(userId).populate("courses");
    const course = await Course.findById(courseId)
      .populate("registers")
      .populate("professor");

    if (!user || !course) {
      return res.status(404).send({
        status: 404,
        message: "not found.",
      });
    }

    if (user.roll === "professor") course.professor = undefined;
    else if (user.roll === "student") {
      course.registers.map((studentsDoc, index) => {
        if (studentsDoc._id.toString() === user._id.toString()) {
          course.registers.splice(index, 1);
        }
      });
    }

    user.courses.map((courseDoc, index) => {
      if (courseDoc._id.toString() === course._id.toString()) {
        user.courses.splice(index, 1);
      }
    });

    await user.save();
    await course.save();
    res.send({ user, course });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get("/user-data", async (req, res) => {
  // const id = req.params.id;
  const id = req.query.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "User not found",
      });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/user", async (req, res) => {
  console.log(req.query);
  const email = req.query.email;
  console.log(email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "No user found.",
      });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err.meesage);
  }
});

router.get("/students", userAuth, async (req, res) => {
  try {
    const users = await User.find({}).populate("courses");

    const students = users.filter((user) => user.roll !== "professor");

    if (students.length === 0) {
      res.status(404).send({
        status: 404,
        message: "No student found",
      });
    }

    res.send(students);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
