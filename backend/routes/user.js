const express = require("express");
const app = express();
const {registerUser, loginUser, getAllUsers} = require("../controllers/user.controllers");
const { isAuth } = require("../middlewares/AuthMiddleware");


app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/get-all-users", isAuth, getAllUsers);
module.exports = app;