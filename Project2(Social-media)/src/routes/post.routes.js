const express = require('express')
const createPostController = require('../controllers/post.controller')
const authMiddleware = require('../middlewares/auth.middlewares')
const multer = require('multer')
const router = express.Router();

const upload = multer({Storage:multer.memoryStorage()})

/* POST /api/post [protected] - {image-file} */

router.post('/',
    authMiddleware,  // req.user = user data save krega
    upload.single("image"),
    createPostController)

module.exports = router