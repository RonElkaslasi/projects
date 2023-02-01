const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      max: 8,
      min: 2,
      required: true,
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
    cart: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Book",
        },
      },
    ],
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

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.statics.findUserByMailAndPass = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("The email or password is incorrect.");
  }

  const isMatchPass = await bcrypt.compare(password, user.password);
  if (!isMatchPass) {
    throw new Error("The email or password is incorrect.");
  }

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

userSchema.methods.addToCart = async function (book) {
  const user = this;

  user.cart.push(book);
  await user.save();
};

userSchema.methods.removeFromCart = async function (book) {
  const user = this;

  for (let bookInTheCart in user.cart) {
    if (user.cart[bookInTheCart]._id.toString() === book) {
      user.cart.remove(user.cart[bookInTheCart]);
      return await user.save();
    }
  }

  throw new Error("book not found");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
