const routes = require('express').Router();
const UserController = require("../controllers/user.controller");

routes.post('/register', UserController.register);
routes.post('/login', UserController.login);
routes.get('/users', UserController.getAllUsers);

module.exports = routes;