// registration of a new user

const express = require("express");
const router = express.Router();
const userSchema = require("../model/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
router.post("/register", async (req, res) => {
  const { name, email, password, favCryptos } = req.body;
  try{if ((!name, !email, !password, !favCryptos)) {
    return res.status(422).json({ message: "Please fill all the details 🔴" });
  }

  const user = await userSchema.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email is already in use." });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await userSchema.create({
    email: email,
    name: name,
    password: hashedPassword,
    favCryptos: favCryptos,
  });
  return res.status(201).json({message: "User created 🟢", details: {name: newUser.name, email: newUser.email, favCryptos: newUser.favCryptos}})}
  catch(err){
    return res.json({message: "Some error occurred in the register route 🔴"})
  }
});

module.exports = router;
