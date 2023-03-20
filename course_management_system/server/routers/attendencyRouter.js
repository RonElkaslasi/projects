const express = require("express");
const userAuth = require("../middleware/userAuth");
const Attendency = require("../models/attendencyModel");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

const router = new express.Router();

router.get("/my-attendencies", async (req, res) => {
  const userId = req.body.userId;
  //   const courseId = req.body.courseId;

  try {
    const attend = await Attendency.find({ userId })
      .populate("course")
      .populate("student");

    if (!attend) {
      return res.status(404).send({
        status: 404,
        message: "No attendency found.",
      });
    }

    res.send(attend);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/course-attendencies", async (req, res) => {
  const course = req.query.course;

  try {
    const courseAttendencies = await Attendency.find({ course })
      .populate("student")
      .populate("course");

    if (!courseAttendencies || courseAttendencies.length === 0) {
      return res.status(404).send({
        status: 404,
        message: "No found.",
      });
    }

    res.send(courseAttendencies);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/attendency", async (req, res) => {
  const attendId = req.body._id;

  try {
    const attend = await Attendency.findByIdAndDelete(attendId);

    if (!attend) {
      return res.status(404).send({
        status: 404,
        message: "Not attendency found.",
      });
    }

    res.send(attend);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/attendance", userAuth, async (req, res) => {
  const { course, userId, date, present, reason } = req.body;

  try {
    const user = await User.findById(userId);
    const attends = await Attendency.find({
      student: user._id,
      course: course._id,
    });

    if (!attends || attends.length === 0) {
      return res.status(404).send({
        status: 404,
        message: "Not found...",
      });
    }

    attends[0].classes.map((classobj) => {
      if (new Date(classobj.date).getDate() === new Date(date).getDate()) {
        classobj.present = present;
        classobj.reason = reason;
      }
    });

    await attends[0].save();
    res.send(attends);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

module.exports = router;
