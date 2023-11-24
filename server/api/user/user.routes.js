const express = require("express");
const user = require(".");
const userRoutes = express.Router();

const userHandlers = require("./user.handlers");

userRoutes.post("/", userHandlers.addUser);

module.exports = userRoutes;
