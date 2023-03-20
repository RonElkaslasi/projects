const express = require("express");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
const userAuth = require("../middleware/userAuth");
const { getClassDates } = require("../utils/utils");
const Attendency = require("../models/attendencyModel");
const { findByIdAndUpdate } = require("../models/userModel");

const router = new express.Router();

router.post("/course", userAuth, async (req, res) => {
  const course = new Course(req.body);
  const { startDate, endDate, dayClass } = course;
  const classDates = getClassDates(startDate, endDate, dayClass);
  try {
    course.classes = classDates;
    // await course.save();

    await course.save();
    res.send({ course });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/course-details/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const course = await Course.findOne({ name });
    res.send(course);
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
});

router.patch("/course-details", userAuth, async (req, res) => {
  const allowEdit = ["name", "startDate", "endDate", "dayClass"];
  const courseName = req.query.name;
  let isUpdateDataIsDates = false;
  for (let updateData in req.body) {
    if (!allowEdit.includes(updateData))
      res.status(400).send({
        status: 400,
        message: "You cannot edit this.",
      });

    if (
      updateData === "startDate" ||
      updateData === "endDate" ||
      updateData === "dayClass"
    ) {
      isUpdateDataIsDates = true;
    }
  }

  try {
    const course = await Course.findOne({ name: courseName })
      .populate("registers")
      .populate("professor");

    for (let updateData in req.body) {
      course[updateData] = req.body[updateData];
    }

    if (isUpdateDataIsDates) {
      course.classes = getClassDates(
        course.startDate,
        course.endDate,
        course.dayClass
      );

      const courseAttends = await Attendency.find({ course });
      if (courseAttends.length > 0) {
        let newClasses = [];
        for (let attend of courseAttends) {
          for (let i = 0; i < course.classes.length; i++) {
            newClasses.push({ date: course.classes[i] });
          }
          await Attendency.findByIdAndUpdate(attend._id, {
            classes: newClasses,
          });
        }
      }
    }

    await course.save();
    res.send(course);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
});

router.delete("/course", userAuth, async (req, res) => {
  const id = req.body._id;
  const attendsId = [];

  try {
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).send({
        status: 404,
        message: "student not found.",
      });
    }
    const courseAttendencies = await Attendency.find({ course });
    console.log(courseAttendencies);
    for (let i = 0; i < courseAttendencies.length; i++) {
      await Attendency.findByIdAndDelete(courseAttendencies[i]._id);
    }

    res.send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/courses", userAuth, async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("registers")
      .populate("professor");
    if (courses.length === 0) {
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

module.exports = router;
