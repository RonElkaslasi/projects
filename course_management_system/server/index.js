const express = require("express");
const cors = require("cors");
// const path = require("path");

const port = process.env.PORT;
require("./db/mongoose");

const courseRouter = require("./routers/courseRouter");

const userRouter = require("./routers/userRouter");
const attendencyRouter = require("./routers/attendencyRouter");
// const clientDirPath = path.join(__dirname, "../course_management_system/build");
const app = express();

app.use(express.json());
app.use(cors());
app.use(courseRouter);
app.use(userRouter);
app.use(attendencyRouter);
// app.use(express.static(clientDirPath));

// app.get("/", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../course_management_system/build/index.html")
//   );
// });

app.listen(port, () => {
  console.log("Server connected, port: ", port);
});
