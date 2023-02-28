const jwt = require("jsonwebtoken");
const Professor = require("../models/professorModel");

const professorAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    const professor = await Professor.findOne({
      _id: data._id,
      "tokens.token": token,
    });

    if (!professor) throw new Error();

    req.professor = professor;
    req.token = token;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = professorAuth;
