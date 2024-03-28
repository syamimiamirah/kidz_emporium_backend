const routes = require('express').Router();
const TaskController = require("../controllers/task.controller");

routes.post("/task", TaskController.createTask);
routes.get("/get-task", TaskController.getTask);
routes.put("/update-task/:id", TaskController.updateTask);
routes.delete("/delete-task/:id", TaskController.deleteTask);  
routes.get('/get-task-details/:id', TaskController.getTaskDetails);
routes.get('/tasks', TaskController.getAllTasks);

module.exports = routes;