const express = require("express");
const Professor = require("../models/professorModel");
const Student = require("../models/studentModel");
const Course = require("../models/courseModel");
const professorAuth = require("../middleware/professorAuth");

const router = new express.Router();

router.post("/professors", async (req, res) => {
  const professor = new Professor(req.body);
  try {
    const token = await professor.generateAuthToken();
    await professor.save();
    res.send({ professor, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/personal-data", professorAuth, async (req, res) => {
  try {
    const professor = req.professor;

    res.send(professor);
  } catch (err) {
    console.log(req);
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
});

router.patch("/personal-data", professorAuth, async (req, res) => {
  const allowEdit = ["name", "email", "password"];

  for (let updateData in req.body) {
    if (!allowEdit.includes(updateData))
      res.status(400).send({
        status: 400,
        message: "You cannot edit this.",
      });
  }

  try {
    const professor = await Professor.findOne(req.professor);
    for (let updateData in req.body) {
      professor[updateData] = req.body[updateData];
    }

    await professor.save();
    res.send(professor);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/professor/login", async (req, res) => {
  const professorEmail = req.body.email;
  const professorPass = req.body.password;
  console.log(professorEmail);
  console.log(professorPass);
  try {
    const professor = await Professor.findProfessorByMailAndPass(
      professorEmail,
      professorPass
    );
    const token = await professor.generateAuthToken();
    console.log(professor);
    res.send({ professor, token });
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/professor/logout", professorAuth, async (req, res) => {
  try {
    req.professor.tokens = req.professor.tokens.filter(
      (tokenDoc) => tokenDoc.token !== req.token
    );
    await req.professor.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/student", professorAuth, async (req, res) => {
  const student = new Student(req.body);
  try {
    const token = await student.generateAuthToken();

    await student.save();
    res.send({ student, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/student/:_id", professorAuth, async (req, res) => {
  const id = req.params._id;

  try {
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).send({
        status: 404,
        message: "student not found.",
      });
    }
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/placement-professor", professorAuth, async (req, res) => {
  const professorName = req.body.professorName;
  const courseName = req.body.courseName;

  try {
    const professor = await Professor.findOne({ name: professorName });
    const course = await Course.findOne({ name: courseName });

    if (!professor || !course) {
      return res.status(404).send({
        status: 404,
        message: "Not exist.",
      });
    }

    professor.courses.push(course);
    course.professor = professor;

    await professor.save();
    await course.save();
    res.send({ professor, course });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post("/add-student-to-class", professorAuth, async (req, res) => {
  const studentId = req.body.studentId;
  const courseId = req.body.courseId;
  console.log(studentId);
  console.log(courseId);
  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    console.log(student);
    if (!student || !course) {
      return res.status(404).send({
        status: 404,
        message: "Not exist.",
      });
    }

    student.courses.push(course);
    course.registers.push(student);

    await student.save();
    await course.save();
    res.send({ student, course });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post("/delete-student-from-class", professorAuth, async (req, res) => {
  const studentId = req.body.studentId;
  const courseId = req.body.courseId;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    student.courses.map((courseDoc, index) => {
      console.log(courseDoc._id);
      if (courseDoc._id.toString() === course._id.toString()) {
        student.courses.splice(index, 1);
      }
    });

    course.registers.map((studentDoc, index) => {
      if (studentDoc._id.toString() === student._id.toString()) {
        course.registers.splice(index, 1);
      }
    });
    console.log(student.courses);
    console.log(course.registers);
    await student.save();
    await course.save();
    res.send({ student, course });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
