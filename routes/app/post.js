const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Appauth");
const postController = require("../../controllers/app/postController");

router.post("/add", NotLoggedIn, postController.add_post);
router.post("/like", postController.like_post);
router.post("/comment", postController.comment_post);

module.exports = router;
