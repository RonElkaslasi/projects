const express = require("express");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT;
require("./db/mongoose");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const bookRouter = require("./routers/bookRouter");

const clientDirPath = path.join(__dirname, "../client");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(adminRouter);
app.use(bookRouter);
app.use(express.static(clientDirPath));

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dashboard/dashboard.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/cart/cart.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/admin.html"));
});

app.listen(port, () => {
  console.log("Server connected, port: ", port);
});
