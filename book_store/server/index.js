const express = require("express");
const cors = require("cors");

const port = process.env.PORT;
require("./db/mongoose");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const bookRouter = require("./routers/bookRouter");
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(adminRouter);
app.use(bookRouter);

app.listen(port, () => {
  console.log("Server connected, port: ", port);
});
