const express = require("express");
const userAuth = require("../middleware/userAuth");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const bcrypt = require("bcryptjs");
const Attendency = require("../models/attendencyModel");

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
    if (user.role !== "student") {
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
    const attendancies = await Attendency.find({ student: user._id });
    console.log(attendancies);
    if (attendancies.length > 0) {
      for (let i = 0; i < attendancies.length; i++)
        await Attendency.findByIdAndDelete(attendancies[i]._id);
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
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/;

  try {
    console.log(req.user);
    const user = await User.findOne(req.user);
    const token = user.tokens[user.tokens.length - 1].token;
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch)
      return res.status(400).send({
        status: 400,
        message: "Incorrect current password",
      });

    if (!passRegex.test(newPassword))
      return res.status(400).send({
        status: 400,
        message: "Invalid password",
      });

    user.password = newPassword;
    await user.save();
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/my-courses", userAuth, async (req, res) => {
  const user = req.user;

  try {
    const courses = await Course.find({ registers: user })
      .populate("registers")
      .populate("professor");

    if (!courses || courses.length === 0) {
      return res.status(404).send({
        status: 404,
        message: "not courses found.",
      });
    }

    res.send(courses);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post("/add-user-to-class", userAuth, async (req, res) => {
  const userId = req.body.userId;
  const courseId = req.body.courseId;
  console.log(userId);
  console.log(courseId);

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId)
      .populate("registers")
      .populate("professor");

    if (!user || !course) {
      return res.status(404).send({
        status: 404,
        message: "not found.",
      });
    }
    let check = course.registers.filter(
      (student) => student.email === user.email
    );

    if (check.length > 0) {
      return res.status(400).send({
        status: 400,
        message: "Student already enrolled to course",
      });
    }
    if (user.role === "student") {
      const courseAttendency = new Attendency({ student: user, course });
      for (let i = 0; i < course.classes.length; i++) {
        courseAttendency.classes.push({ date: course.classes[i] });
      }

      await courseAttendency.save();
    }

    // for (let i = 0; i < course.classes.length; i++) {
    //   courseAttendency.classes.push({ date: course.classes[i] });
    // }

    if (user.role === "student") course.registers.push(user);
    else if (user.role === "professor") course.professor = user;
    console.log(user.role);
    user.courses.push(course);

    await user.save();
    await course.save();

    res.send({ user, course });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
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
    const attendencies = await Attendency.find({});
    const relatedAttends = attendencies.filter((attend) => {
      return (
        attend.course._id.equals(course._id) &&
        attend.student.toString() === user._id.toString()
      );
    });
    for (let i = 0; i < relatedAttends.length; i++) {
      await Attendency.findByIdAndDelete(relatedAttends[i]._id);
    }
    if (user.role === "professor") course.professor = undefined;
    else if (user.role === "student") {
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
    // await attendencies.save();
    res.send({ user, course });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get("/user-data", async (req, res) => {
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
  const email = req.query.email;

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

    const students = users.filter((user) => user.role !== "professor");

    if (students.length === 0) {
      return res.status(404).send({
        status: 404,
        message: "No student found",
      });
    }

    res.send(students);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/professors", userAuth, async (req, res) => {
  try {
    const users = await User.find({}).populate("courses");

    const professors = users.filter((user) => user.role !== "student");

    if (professors.length === 0) {
      return res.status(404).send({
        status: 404,
        message: "No professor found",
      });
    }

    res.send(professors);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
