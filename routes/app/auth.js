const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Appauth");
const AuthController = require("../../controllers/app/authController");

router.post("/login", AuthController.login);
router.post("/otp-verify", AuthController.otp_verify);
router.post("/register", AuthController.register);
router.post("/profile-update", AuthController.editProfile);
router.post("/get_user_profile", AuthController.get_user_profile);
router.post("/coupon-verify", NotLoggedIn, AuthController.coupon_verify);

module.exports = router;
``;
