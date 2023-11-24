const express = require("express");
const question = require(".");
const questionRoutes = express.Router();

const questionHandlers = require("./question.handler");
questionRoutes.post("/", questionHandlers.addQuestion);

module.exports = questionRoutes;
