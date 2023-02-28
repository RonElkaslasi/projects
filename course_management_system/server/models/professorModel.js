const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const professorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      min: 2,
      required: true,
    },
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

professorSchema.pre("save", async function (next) {
  const professor = this;

  if (professor.isModified("password"))
    professor.password = await bcrypt.hash(professor.password, 8);

  next();
});

professorSchema.statics.findProfessorByMailAndPass = async (
  email,
  password
) => {
  const professor = await Professor.findOne({ email });
  if (!professor) throw new Error("The email or password is incorrect.");

  const isMatchPass = await bcrypt.compare(password, professor.password);
  if (!isMatchPass) throw new Error("The email or password is incorrect.");

  return professor;
};

professorSchema.methods.generateAuthToken = async function () {
  const professor = this;
  const token = jwt.sign({ _id: professor._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  professor.tokens = professor.tokens.concat({ token });
  await professor.save();

  return token;
};

const Professor = mongoose.model("Professor", professorSchema);

module.exports = Professor;
