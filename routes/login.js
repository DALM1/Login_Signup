const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

//Import du model User
const User = require("../models/User");

router.post("/user/login", async (req, res) => {
  const { email, password } = req.fields;
  console.log(email, password);

  try {
    if (email && password) {
      const getUser = await User.findOne({ email: email });
      if (getUser) {
        console.log(getUser);
        const newHash = SHA256(password + getUser.salt).toString(encBase64);
        if (newHash === getUser.hash) {
          res.status(200).json({
            success: getUser.token
          });
        } else {
          res.status(200).json({
            message: "Wrong password!"
          });
        }
      } else {
        res.status(400).json({
          message: "Could not find user"
        });
      }
    } else {
      res.status(400).json({
        message: "Missing fields. Fill out the form correctly!"
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
