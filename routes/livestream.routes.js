const routes = require('express').Router();
const LivestreamController = require("../controllers/livestream.controller");

routes.post("/livestream", LivestreamController.createLivestream);
routes.get("/get-livestream", LivestreamController.getLivestream);
routes.put("/update-livestream/:id", LivestreamController.updateLivestream);
routes.delete("/delete-livestream/:id", LivestreamController.deleteLivestream);
routes.get("/get-livestream-details/:id", LivestreamController.getLivestreamDetails);
routes.get("/livestreams", LivestreamController.getAllLivestreams);

module.exports = routes;