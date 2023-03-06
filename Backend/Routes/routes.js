const router = require("express").Router();
const upload = require("../Middleware/multer")
const isAuth = require('../Middleware/isAuth')
const RoutesController = require('../Controllers/RoutesController');

router.post('/signup', RoutesController.RegisterUser);
router.post('/login', RoutesController.LoginUser);

router.get('/getinstitutions', isAuth, RoutesController.GetInstitutions)

router.post('/createinstitute', isAuth, RoutesController.CreateInstitute)
router.post('/createcourse', isAuth, RoutesController.CreateCourse)
router.post('/createsubject', isAuth, RoutesController.CreateSubject)
router.post('/upload', isAuth, upload.array("files", 10), RoutesController.UploadToDrive)
// router.post('/download', RoutesController.DownloadFromDrive)

module.exports = router;
