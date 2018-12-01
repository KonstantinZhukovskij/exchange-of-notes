const express = require('express');
const commentController = require('../controllers/comment');

const router = express.Router();

router.post('/comment', commentController.postComment);
router.get('/comment/:id', commentController.getAllCommentsToSummary);

module.exports = router;