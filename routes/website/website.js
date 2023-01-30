const router = require("express").Router();
const websiteController = require("../../controllers/website/websiteController");

router.get("/index", websiteController.index);
router.post("/food", websiteController.food);
router.get("/about", websiteController.about);
router.get("/package", websiteController.package);
router.get("/gallery", websiteController.gallery);
router.get("/team", websiteController.team);
router.get("/plan", websiteController.plan);
router.get("/faq", websiteController.faq);
router.get("/contact", websiteController.contact);


router.post("/addcontact", websiteController.addcontact);


module.exports = router;
