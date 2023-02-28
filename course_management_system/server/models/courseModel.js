const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      min: 2,
      required: true,
      unique: true,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      required: true,
      trim: true,
    },
    dayClass: [
      {
        type: Number,
        min: 1,
        max: 7,
      },
    ],
    registers: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
