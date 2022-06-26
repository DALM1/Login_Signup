const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const app = express();

const User = require("../models/User");

//MiddleWare authenticated
const isAuthenticated = async (req, res, next) => {
  if (req.fields.token) {
    const user = await User.findOne({
      token: req.fields.token,
    });
    if (!user) {
      res.status(400).json({
        error: "Unauthorized!",
      });
    } else {
      req.user = user;
      next();
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
