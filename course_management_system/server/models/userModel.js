const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
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
    roll: {
      type: String,
      required: true,
      trim: true,
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

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);

  next();
});

userSchema.statics.findUserByMailAndPass = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("The email or password is incorrect.");

  const isMatchPass = await bcrypt.compare(password, user.password);
  if (!isMatchPass) throw new Error("The email or password is incorrect.");

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
