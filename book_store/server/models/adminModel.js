const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      max: 8,
      min: 2,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 8,
      validate(value) {
        const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/;
        if (!passRegex.test(value)) {
          throw new Error(
            "Password must contain big letter, small letter and digit"
          );
        }
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
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  const admin = this;

  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }

  next();
});

adminSchema.statics.findAdminByUsernameAndPass = async (username, password) => {
  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new Error("The username or password is incorrect.");
  }

  const isMatchPass = await bcrypt.compare(password, admin.password);
  if (!isMatchPass) {
    throw new Error("The username or password is incorrect.");
  }

  return admin;
};

adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  admin.tokens = admin.tokens.concat({ token });
  await admin.save();

  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
