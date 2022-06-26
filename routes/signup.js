const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

//Import du model User
const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  const { username, email, password } = req.fields;
  console.log(username, email, password);
  try {
    if (email && username && password) {
      const emailDuplicate = await User.findOne({ email: email });
      const usernameDuplicate = await User.findOne({ username: username });
      if (!emailDuplicate) {
        if (!usernameDuplicate) {
          //Crée un token
          const token = uid2(16);
          const salt = uid2(16);
          //Je crée mon hash
          const hash = SHA256(password + salt).toString(encBase64);
          //Je crée un nouveau User
          const newUser = new User({
            email,
            username,
            password,
            token,
            salt,
            hash,
          });
          //Sauvegarde le nouvel utilisateur
          await newUser.save();

          res.status(200).json({
            _id: newUser._id,
            email,
            username,
            token,
          });
        } else {
          res.status(400).json({
            message: "This username is already taken!",
          });
        }
      } else {
        res.status(400).json({
          message: "Email already taken",
        });
      }
    } else {
      res.status(400).json({
        message: "Missing fields. Fill out the form correctly",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
