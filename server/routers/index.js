const express = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const summaryRouter = require('./summaryRouter');
const commentRouter = require('./commentRouter');

const router = express.Router();

router.use(authRouter);
router.use(userRouter);
router.use(summaryRouter);
router.use(commentRouter);

module.exports = router;