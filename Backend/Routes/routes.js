const router = require("express").Router();
const RoutesController = require('../Controllers/RoutesController');

router.post('/signup', RoutesController.RegisterUser);
router.post('/login', RoutesController.LoginUser);

module.exports = router;
