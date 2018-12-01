const express = require('express');
const summaryController = require('../controllers/summary');
const searchController = require('../controllers/search');

const router = express.Router();

router.post('/create', summaryController.postSummary);
router.get('/allSummaries', summaryController.getAllSummaries);
router.get('/summary', summaryController.getPaginationSummaries);
router.get('/popularSummary', summaryController.getPopularSummaries);
router.get('/authorSummary', summaryController.getAllAuthorSummaries);
router.get('/summary/:id', summaryController.getSummaryById);
router.put('/summary/:id', summaryController.updateSummary);
router.delete('/summary', summaryController.deleteSummary);
router.get('/search', searchController.getFoundText);

module.exports = router;