const express = require("express");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT;
require("./db/mongoose");
const professorRouter = require("./routers/professorRouter");
const courseRouter = require("./routers/courseRouter");
const studentRouter = require("./routers/studentRouter");
const clientDirPath = path.join(__dirname, "../public");
const app = express();
app.use(express.json());
app.use(cors());
app.use(professorRouter);
app.use(courseRouter);
app.use(studentRouter);
app.use(express.static(clientDirPath));

app.listen(port, () => {
  console.log("Server connected, port: ", port);
});
