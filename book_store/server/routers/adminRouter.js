const express = require("express");
const Admin = require("../models/adminModel");
const authAdmin = require("../middleware/authAdmin");

const router = new express.Router();

router.post("/admin/new", async (req, res) => {
  const admin = new Admin(req.body);

  try {
    const token = await admin.generateAuthToken();
    await admin.save();
    res.send({ admin, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/admin/edit", authAdmin, async (req, res) => {
  const allowEdit = ["username", "email", "password"];
  for (let update in req.body) {
    if (!allowEdit.includes(update)) {
      res.status(400).send({
        status: 400,
        message: "You cannot edit this.",
      });
    }
  }

  try {
    for (let update in req.body) {
      req.admin[update] = req.body[update];
    }

    await req.admin.save();
    res.send(req.admin);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/admin/login", async (req, res) => {
  const adminUsername = req.body.username;
  const adminPass = req.body.password;

  try {
    const admin = await Admin.findAdminByUsernameAndPass(
      adminUsername,
      adminPass
    );
    await admin.generateAuthToken();

    res.send(admin);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/admin/logout", authAdmin, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter(
      (tokeDoc) => tokeDoc.token !== req.token
    );
    await req.admin.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/admin/get-admin", authAdmin, async (req, res) => {
  try {
    const admin = req.admin;

    res.send(admin);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
});
module.exports = router;
