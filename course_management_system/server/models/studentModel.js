const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      min: 2,
      required: true,
    },
    lname: {
      type: String,
      trim: true,
      min: 2,
      required: true,
    },
    birth: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      min: 2,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid Email");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/;
        if (!passRegex.test(value))
          throw new Error(
            "Password must contain big letter, small letter and digit"
          );
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  const student = this;

  if (student.isModified("password"))
    student.password = await bcrypt.hash(student.password, 8);

  next();
});

studentSchema.statics.findStudentByMailAndPass = async (
    email,
    password
  ) => {
    const student = await Student.findOne({ email });
    if (!student) throw new Error("The email or password is incorrect.");
  
    const isMatchPass = await bcrypt.compare(password, student.password);
    if (!isMatchPass) throw new Error("The email or password is incorrect.");
  
    return student;
  };

studentSchema.methods.generateAuthToken = async function () {
  const student = this;
  const token = jwt.sign({ _id: student._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  student.tokens = student.tokens.concat({ token });
  await student.save();

  return token;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
