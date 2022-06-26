const express = require("express");
const formidableMiddleware = require("express-formidable");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 80;
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(formidableMiddleware());

//Creation de la BDD
mongoose.connect(process.env.MONGODB_CONNECT);

//Import des routes

const signup = require("./routes/signup");
app.use(signup);

const login = require("./routes/login");
app.use(login);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(PORT, () => {
  console.log("Server has started 🚀");
});
