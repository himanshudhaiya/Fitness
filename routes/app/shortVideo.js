const ShortVideoController = require("../../controllers/app/shortVideoController");
const { NotLoggedIn } = require("../../middlewares/Appauth");
const router = require("express").Router();

router.post("/add", NotLoggedIn, ShortVideoController.add_shortVideo);
router.post("/like", ShortVideoController.shortvideo_like);
router.post("/comment", ShortVideoController.shortvideo_comment);
router.post("/saved", ShortVideoController.video_saved);

module.exports = router;
