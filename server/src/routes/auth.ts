import express from "express";
import { validateEmail, validateHash } from "../utils";
import User from "../models/User";

const router = express.Router();

router.post("/register", async (req, res) => {
  if (
    req.body.email &&
    validateEmail(req.body.email) &&
    req.body.password &&
    validateHash(req.body.password)
  ) {
    const checkUser = await User.find({ email: req.body.email });
    if (checkUser.length) {
      return res
        .status(400)
        .send({ code: 1, message: "email already registered" });
    }

    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save().then(() => {
      return res
        .status(200)
        .send({ code: 0, message: "User added succesfully", id: newUser._id });
    });
  } else {
    return res
      .status(400)
      .send({ code: 1, message: "Invalid user details in body" });
  }
});

router.get("/validate", async (req, res) => {
  if (req.query.email && req.query.password) {
    const user = await User.findOne({
      email: req.query.email,
      password: req.query.password,
    });
    if (user) {
      return res.status(200).send({ code: 0, email: user.email, id: user._id });
    }
  }
  return res.status(400).send({ code: 1, message: "Invalid credentials" });
});

export default router;
