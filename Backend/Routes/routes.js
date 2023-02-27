const router = require("express").Router();
const upload = require("../Middleware/multer")
const RoutesController = require('../Controllers/RoutesController');

router.post('/signup', RoutesController.RegisterUser);
router.post('/login', RoutesController.LoginUser);

router.post('/upload', upload.array("files", 10), RoutesController.UploadToDrive)
// router.post('/download', RoutesController.DownloadFromDrive)

module.exports = router;
