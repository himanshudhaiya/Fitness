const router = require("express").Router();
const Web_Testimonial = require("../../controllers/admin/web_testimonialController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");

router.get("/list", NotLoggedIn, Web_Testimonial.list);
router.post("/add", NotLoggedIn, Web_Testimonial.add);
router.post("/edit", NotLoggedIn, Web_Testimonial.update);
router.post("/delete", NotLoggedIn, Web_Testimonial.delete);

module.exports = router;