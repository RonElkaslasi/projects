const express = require("express");
const Student = require("../models/studentModel");
const studentAuth = require("../middleware/studentAuth");
const router = new express.Router();

router.get("/personal-data", studentAuth, async (req, res) => {
  try {
    const student = req.student;

    res.send(student);
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/student/login", async (req, res) => {
  const studentEmail = req.body.email;
  const studentPassword = req.body.password;

  try {
    const student = await Student.findStudentByMailAndPass(
      studentEmail,
      studentPassword
    );
    const token = await student.generateAuthToken();

    res.send({ student, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/student/logout", studentAuth, async (req, res) => {
  try {
    req.student.tokens = req.student.tokens.filter(
      (tokenDoc) => tokenDoc.token !== req.token
    );
    await req.student.save();
    res.send();
  } catch (err) {
    res.status(401).send(err);
  }
});

router.patch("/personal-details-student", studentAuth, async (req, res) => {
  const allowEdit = ["fname", "lname", "birth", "address", "email", "password"];

  for (let updateData in req.body) {
    if (!allowEdit.includes(updateData))
      res.status(400).send({
        status: 400,
        message: "You cannot edit this.",
      });
  }

  try {
    const student = await Student.findOne(req.student);

    for (let updateData in req.body) {
      student[updateData] = req.body[updateData];
    }

    await student.save();
    res.send(student);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/my-courses", studentAuth, async (req, res) => {
  const student = req.student;

  try {
    console.log(student);
    if (student.courses.length === 0) {
      res.status(404).send({
        status: 404,
        message: "not courses found.",
      });
    }

    res.send(student.courses);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
