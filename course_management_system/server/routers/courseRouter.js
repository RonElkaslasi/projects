const express = require("express");
const Professor = require("../models/professorModel");

const Course = require("../models/courseModel");
const professorAuth = require("../middleware/professorAuth");
const Student = require("../models/studentModel");
const User = require("../models/userModel");
const userAuth = require("../middleware/userAuth");

const router = new express.Router();

router.post("/course", userAuth, async (req, res) => {
  const course = new Course(req.body);

  try {
    await course.save();
    res.send({ course });
  } catch (err) {
    res.status(400).send(err);
  }
});
// router.post("/course", professorAuth, async (req, res) => {
//   const course = new Course(req.body);
//   console.log(course);
//   try {
//     await course.save();
//     res.send({ course });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

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
  console.log(courseName);
  for (let updateData in req.body) {
    if (!allowEdit.includes(updateData))
      res.status(400).send({
        status: 400,
        message: "You cannot edit this.",
      });
  }

  try {
    const course = await Course.findOne({ name: courseName });
    console.log(course);
    for (let updateData in req.body) {
      course[updateData] = req.body[updateData];
    }

    await course.save();
    res.send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.patch("/course-details", professorAuth, async (req, res) => {
//   const allowEdit = ["name", "startDate", "endDate", "dayClass", "registers"];

//   for (let updateData in req.body) {
//     if (!allowEdit.includes(updateData))
//       res.status(400).send({
//         status: 400,
//         message: "You cannot edit this.",
//       });
//   }

//   try {
//     const course = await Course.findOne(req.course);
//     for (let updateData in req.body) {
//       course[updateData] = req.body[updateData];
//     }

//     await course.save();
//     res.send(course);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.delete("/course/:_id", userAuth, async (req, res) => {
router.delete("/course", userAuth, async (req, res) => {
  // const id = req.params._id;
  const id = req.body._id;
  console.log(id);
  try {
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).send({
        status: 404,
        message: "student not found.",
      });
    }
    res.send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.delete("/course/:_id", professorAuth, async (req, res) => {
//   const id = req.params._id;

//   try {
//     const course = await Course.findByIdAndDelete(id);

//     if (!course) {
//       return res.status(404).send({
//         status: 404,
//         message: "student not found.",
//       });
//     }
//     res.send(course);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.get("/courses", userAuth, async (req, res) => {
  try {
    const courses = await Course.find({});

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

// router.get("/courses", professorAuth, async (req, res) => {
//   try {
//     const courses = await Course.find({});

//     if (courses.length === 0) {
//       return res.status(404).send({
//         status: 404,
//         message: "not courses found.",
//       });
//     }
//     res.send(courses);
//   } catch (err) {
//     res.status(401).send(err.message);
//   }
// });
module.exports = router;
