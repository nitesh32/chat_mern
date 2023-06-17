const express = require("express");
const router = express.Router();

const PostController= require("../controllers/posts_controller");

router.post('/create',PostController.create);
router.post('/destroy',PostController.destroy);

module.exports = router;