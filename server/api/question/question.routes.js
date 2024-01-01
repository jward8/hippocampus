const express = require("express");
const question = require(".");
const questionRoutes = express.Router();

const questionHandlers = require("./question.handler");
questionRoutes.post("/", questionHandlers.addQuestion);
questionRoutes.delete("/:questionId", questionHandlers.deleteQuestion);
questionRoutes.get("/:size", questionHandlers.getQuestions);

module.exports = questionRoutes;
