const express = require("express");
const router = express.Router();

const CommentController= require("../controllers/comments_controller");

router.post('/create_comment',CommentController.create_comment);
router.post('/delcomment',CommentController.delcomment);

module.exports = router;