// login route for the user

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userSchema = require("../model/user.model");
const bcrypt = require("bcryptjs");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // if (!email, !password) {
    //   return res
    //     .status(422)
    //     .json({ message: "Please fill all the details 🔴" });
    // }
    const findUser = await userSchema.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "User is not registered 🔴" });
    }
    const passwordMatching = await bcrypt.compare(password, findUser.password);
console.log(passwordMatching)
    if (!passwordMatching) {
      res
        .status(401)
        .json({ message: "Auth Failed, Wrong Email or Password 🔴" });
    }
    const token = jwt.sign(
      {
        name: findUser.name,
        isVerified: findUser.isVerified,
        favCryptos: findUser.favCryptos,
      },
      process.env.JWT_SECRET.toString()
    );
    return res.status(201).json({ message: "User logged in 🟢", token: token });
  } catch (err) {
    return res.json({ message: "Some error occurred in the login route 🔴" });
  }
});

module.exports = router