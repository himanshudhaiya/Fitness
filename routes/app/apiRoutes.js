const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Appauth");
const ApiController = require("../../controllers/app/apiController");

router.get("/aboutus/list", NotLoggedIn, ApiController.about);
router.get("/banner/list", NotLoggedIn, ApiController.banner);
router.get("/contactus/list", NotLoggedIn, ApiController.contact);
router.get("/faq/list", NotLoggedIn, ApiController.faq);
router.get("/slider/list", NotLoggedIn, ApiController.slider);
router.get("/privacypolicy/list", NotLoggedIn, ApiController.privacypolicy);
router.get("/termscondition/list", NotLoggedIn, ApiController.termscondition);
router.get("/blog/list", NotLoggedIn, ApiController.blog);
router.get("/users/list", NotLoggedIn, ApiController.users);
router.get("/orders/list", NotLoggedIn, ApiController.orders);
router.get("/coupons/list", NotLoggedIn, ApiController.coupons);
router.get("/posts/list", NotLoggedIn, ApiController.posts);
router.post("/like/list", NotLoggedIn, ApiController.likes);
router.get("/packages/list", NotLoggedIn, ApiController.packages);
router.get("/classes/list", NotLoggedIn, ApiController.classes);
router.get("/documents/list", NotLoggedIn, ApiController.documents);
router.get("/shortvideos/list", NotLoggedIn, ApiController.shortvideos);
router.post(
  "/shortvideo_likes/list",
  NotLoggedIn,
  ApiController.shortvideo_likes
);
router.get("/saved_videos/list", NotLoggedIn, ApiController.saved_videos);
router.post(
  "/calculate_basal_metabolic_rate",
  NotLoggedIn,
  ApiController.calculate_basal_metabolic_rate
);
router.post(
  "/calculate_total_daily_energy_expenditure",
  NotLoggedIn,
  ApiController.calculate_total_daily_energy_expenditure
);
router.post(
  "/calculate_total_daily_caloric_needs",
  NotLoggedIn,
  ApiController.calculate_total_daily_caloric_needs
);
router.post(
  "/calculate_ideal_weight",
  NotLoggedIn,
  ApiController.calculate_ideal_weight
);
router.get(
  "/get_activity_level_dropdown",
  NotLoggedIn,
  ApiController.get_activity_level_dropdown
);
router.get("/get_goal_dropdown", NotLoggedIn, ApiController.get_goal_dropdown);
router.get(
  "/get_approach_dropdown",
  NotLoggedIn,
  ApiController.get_approach_dropdown
);

module.exports = router;
