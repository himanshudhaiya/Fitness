const router = require("express").Router();
const NotificationController = require("../../controllers/app/notificationController");
const { NotLoggedIn } = require("../../middlewares/Appauth");

router.get("/get", NotLoggedIn, NotificationController.get);

module.exports = router;
