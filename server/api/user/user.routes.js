const express = require('express');
const user = require('.');
const userRoutes = express.Router();

const userHandlers = require('./user.handlers');

userRoutes.get('/', userHandlers.getUsers);
userRoutes.post('/', userHandlers.addUser);

module.exports = userRoutes;