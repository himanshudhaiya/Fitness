const router = require('express').Router();
const abouts = require('../../controllers/admin/aboutsController');
const { NotLoggedIn } = require('../../middlewares/Adminauth')

router.get('/list', NotLoggedIn, abouts.list);
router.post('/add', NotLoggedIn, abouts.add);
router.post('/delete', NotLoggedIn, abouts.delete);

module.exports = router;