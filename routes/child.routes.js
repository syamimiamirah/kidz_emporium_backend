const routes = require('express').Router();
const ChildController = require("../controllers/child.controller");

routes.post("/child", ChildController.createChild);
routes.get("/get-child", ChildController.getChild);
routes.put("/update-child/:id", ChildController.updateChild);
routes.delete("/delete-child", ChildController.deleteChild);
routes.get('/get-child-details/:id', ChildController.getChildDetails);

module.exports = routes;